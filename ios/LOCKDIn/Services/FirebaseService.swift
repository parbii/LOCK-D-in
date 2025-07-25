import Foundation
import FirebaseFirestore
import FirebaseAuth
import Combine

@MainActor
class FirebaseService: ObservableObject {
    private let db = Firestore.firestore()
    private let auth = Auth.auth()
    
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    // MARK: - User Profile Operations
    
    func createUserProfile(userId: String, data: [String: Any]) async throws {
        try await db.collection("users").document(userId).setData(data)
    }
    
    func getUserProfile(userId: String) async throws -> UserProfile? {
        let document = try await db.collection("users").document(userId).getDocument()
        
        guard let data = document.data() else { return nil }
        return try Firestore.Decoder().decode(UserProfile.self, from: data)
    }
    
    func updateUserProfile(userId: String, data: [String: Any]) async throws {
        try await db.collection("users").document(userId).updateData(data)
    }
    
    // MARK: - Goals Operations
    
    func createGoal(userId: String, goal: Goal) async throws {
        let goalData = try Firestore.Encoder().encode(goal)
        try await db.collection("users").document(userId)
            .collection("goals").addDocument(data: goalData)
    }
    
    func getUserGoals(userId: String) async throws -> [Goal] {
        let snapshot = try await db.collection("users").document(userId)
            .collection("goals")
            .order(by: "createdAt", descending: true)
            .getDocuments()
        
        return snapshot.documents.compactMap { document in
            do {
                var goal = try document.data(as: Goal.self)
                goal.id = document.documentID
                return goal
            } catch {
                print("Error decoding goal: \(error)")
                return nil
            }
        }
    }
    
    func updateGoal(userId: String, goal: Goal) async throws {
        guard let goalId = goal.id else {
            throw NSError(domain: "FirebaseService", code: 0, userInfo: [NSLocalizedDescriptionKey: "Goal ID is required"])
        }
        
        let goalData = try Firestore.Encoder().encode(goal)
        try await db.collection("users").document(userId)
            .collection("goals").document(goalId).updateData(goalData)
    }
    
    func deleteGoal(userId: String, goalId: String) async throws {
        try await db.collection("users").document(userId)
            .collection("goals").document(goalId).delete()
    }
    
    // MARK: - Communities Operations
    
    func getCommunities() async throws -> [Community] {
        let snapshot = try await db.collection("communities")
            .order(by: "memberCount", descending: true)
            .getDocuments()
        
        return snapshot.documents.compactMap { document in
            do {
                var community = try document.data(as: Community.self)
                community.id = document.documentID
                return community
            } catch {
                print("Error decoding community: \(error)")
                return nil
            }
        }
    }
    
    func joinCommunity(userId: String, communityId: String) async throws {
        try await db.collection("communities").document(communityId)
            .collection("members").document(userId)
            .setData([
                "joinedAt": Timestamp(),
                "userId": userId
            ])
        
        // Increment member count
        try await db.collection("communities").document(communityId)
            .updateData(["memberCount": FieldValue.increment(Int64(1))])
    }
    
    func leaveCommunity(userId: String, communityId: String) async throws {
        try await db.collection("communities").document(communityId)
            .collection("members").document(userId).delete()
        
        // Decrement member count
        try await db.collection("communities").document(communityId)
            .updateData(["memberCount": FieldValue.increment(Int64(-1))])
    }
    
    // MARK: - Posts Operations
    
    func createPost(userId: String, communityId: String, post: Post) async throws {
        var postData = try Firestore.Encoder().encode(post)
        postData["authorId"] = userId
        postData["createdAt"] = Timestamp()
        
        try await db.collection("communities").document(communityId)
            .collection("posts").addDocument(data: postData)
    }
    
    func getCommunityPosts(communityId: String) async throws -> [Post] {
        let snapshot = try await db.collection("communities").document(communityId)
            .collection("posts")
            .order(by: "createdAt", descending: true)
            .limit(to: 50)
            .getDocuments()
        
        return snapshot.documents.compactMap { document in
            do {
                var post = try document.data(as: Post.self)
                post.id = document.documentID
                return post
            } catch {
                print("Error decoding post: \(error)")
                return nil
            }
        }
    }
    
    func getUserPosts(userId: String) async throws -> [Post] {
        let snapshot = try await db.collectionGroup("posts")
            .whereField("authorId", isEqualTo: userId)
            .order(by: "createdAt", descending: true)
            .limit(to: 50)
            .getDocuments()
        
        return snapshot.documents.compactMap { document in
            do {
                var post = try document.data(as: Post.self)
                post.id = document.documentID
                return post
            } catch {
                print("Error decoding post: \(error)")
                return nil
            }
        }
    }
    
    // MARK: - Real-time Listeners
    
    func listenToUserGoals(userId: String, completion: @escaping ([Goal]) -> Void) -> ListenerRegistration {
        return db.collection("users").document(userId)
            .collection("goals")
            .order(by: "createdAt", descending: true)
            .addSnapshotListener { snapshot, error in
                guard let documents = snapshot?.documents else {
                    if let error = error {
                        print("Error listening to goals: \(error)")
                    }
                    return
                }
                
                let goals = documents.compactMap { document -> Goal? in
                    do {
                        var goal = try document.data(as: Goal.self)
                        goal.id = document.documentID
                        return goal
                    } catch {
                        print("Error decoding goal: \(error)")
                        return nil
                    }
                }
                
                DispatchQueue.main.async {
                    completion(goals)
                }
            }
    }
    
    func listenToCommunityPosts(communityId: String, completion: @escaping ([Post]) -> Void) -> ListenerRegistration {
        return db.collection("communities").document(communityId)
            .collection("posts")
            .order(by: "createdAt", descending: true)
            .limit(to: 50)
            .addSnapshotListener { snapshot, error in
                guard let documents = snapshot?.documents else {
                    if let error = error {
                        print("Error listening to posts: \(error)")
                    }
                    return
                }
                
                let posts = documents.compactMap { document -> Post? in
                    do {
                        var post = try document.data(as: Post.self)
                        post.id = document.documentID
                        return post
                    } catch {
                        print("Error decoding post: \(error)")
                        return nil
                    }
                }
                
                DispatchQueue.main.async {
                    completion(posts)
                }
            }
    }
    
    // MARK: - Helper Methods
    
    func clearError() {
        errorMessage = nil
    }
} 