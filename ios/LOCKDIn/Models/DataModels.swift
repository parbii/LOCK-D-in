import Foundation
import FirebaseFirestore

// MARK: - User Profile Model
struct UserProfile: Codable, Identifiable {
    @DocumentID var id: String?
    let email: String
    let displayName: String?
    let profileImageURL: String?
    let bio: String?
    let joinedAt: Timestamp
    let streakCount: Int
    let totalPoints: Int
    
    enum CodingKeys: String, CodingKey {
        case id
        case email
        case displayName = "display_name"
        case profileImageURL = "profile_image_url"
        case bio
        case joinedAt = "joined_at"
        case streakCount = "streak_count"
        case totalPoints = "total_points"
    }
    
    init(id: String? = nil, email: String, displayName: String? = nil, profileImageURL: String? = nil, 
         bio: String? = nil, joinedAt: Timestamp = Timestamp(), streakCount: Int = 0, totalPoints: Int = 0) {
        self.id = id
        self.email = email
        self.displayName = displayName
        self.profileImageURL = profileImageURL
        self.bio = bio
        self.joinedAt = joinedAt
        self.streakCount = streakCount
        self.totalPoints = totalPoints
    }
}

// MARK: - Goal Model
struct Goal: Codable, Identifiable {
    @DocumentID var id: String?
    let name: String
    let description: String
    let category: String
    let targetDate: Timestamp?
    let isCompleted: Bool
    let createdAt: Timestamp
    let progress: Double // 0-100
    let streak: Int
    let lastCompleted: String? // Date string in YYYY-MM-DD format
    let habits: [Habit]
    
    enum CodingKeys: String, CodingKey {
        case id
        case name
        case description
        case category
        case targetDate = "target_date"
        case isCompleted = "is_completed"
        case createdAt = "created_at"
        case progress
        case streak
        case lastCompleted = "last_completed"
        case habits
    }
    
    init(id: String? = nil, name: String, description: String, category: String = "Personal",
         targetDate: Timestamp? = nil, isCompleted: Bool = false, createdAt: Timestamp = Timestamp(),
         progress: Double = 0, streak: Int = 0, lastCompleted: String? = nil, habits: [Habit] = []) {
        self.id = id
        self.name = name
        self.description = description
        self.category = category
        self.targetDate = targetDate
        self.isCompleted = isCompleted
        self.createdAt = createdAt
        self.progress = progress
        self.streak = streak
        self.lastCompleted = lastCompleted
        self.habits = habits
    }
}

// MARK: - Habit Model
struct Habit: Codable, Identifiable {
    let id: String
    let text: String
    let isCompleted: Bool
    
    init(id: String = UUID().uuidString, text: String, isCompleted: Bool = false) {
        self.id = id
        self.text = text
        self.isCompleted = isCompleted
    }
}

// MARK: - Community Model
struct Community: Codable, Identifiable {
    @DocumentID var id: String?
    let name: String
    let description: String
    let imageURL: String?
    let memberCount: Int
    let category: String
    let isPrivate: Bool
    let createdAt: Timestamp
    
    enum CodingKeys: String, CodingKey {
        case id
        case name
        case description
        case imageURL = "image_url"
        case memberCount = "member_count"
        case category
        case isPrivate = "is_private"
        case createdAt = "created_at"
    }
    
    init(id: String? = nil, name: String, description: String, imageURL: String? = nil,
         memberCount: Int = 0, category: String = "General", isPrivate: Bool = false,
         createdAt: Timestamp = Timestamp()) {
        self.id = id
        self.name = name
        self.description = description
        self.imageURL = imageURL
        self.memberCount = memberCount
        self.category = category
        self.isPrivate = isPrivate
        self.createdAt = createdAt
    }
}

// MARK: - Post Model
struct Post: Codable, Identifiable {
    @DocumentID var id: String?
    let authorId: String
    let authorName: String
    let content: String
    let imageURL: String?
    let likesCount: Int
    let commentsCount: Int
    let createdAt: Timestamp
    let tags: [String]
    var liked: Bool = false // Local state, not stored in Firebase
    var comments: [Comment] = [] // Local state for UI
    
    enum CodingKeys: String, CodingKey {
        case id
        case authorId = "author_id"
        case authorName = "author_name"
        case content
        case imageURL = "image_url"
        case likesCount = "likes_count"
        case commentsCount = "comments_count"
        case createdAt = "created_at"
        case tags
    }
    
    init(id: String? = nil, authorId: String, authorName: String, content: String,
         imageURL: String? = nil, likesCount: Int = 0, commentsCount: Int = 0,
         createdAt: Timestamp = Timestamp(), tags: [String] = []) {
        self.id = id
        self.authorId = authorId
        self.authorName = authorName
        self.content = content
        self.imageURL = imageURL
        self.likesCount = likesCount
        self.commentsCount = commentsCount
        self.createdAt = createdAt
        self.tags = tags
    }
}

// MARK: - Comment Model
struct Comment: Codable, Identifiable {
    let id: String
    let authorId: String
    let authorName: String
    let authorAvatar: String?
    let text: String
    let createdAt: Timestamp
    
    enum CodingKeys: String, CodingKey {
        case id
        case authorId = "author_id"
        case authorName = "author_name"
        case authorAvatar = "author_avatar"
        case text
        case createdAt = "created_at"
    }
    
    init(id: String = UUID().uuidString, authorId: String, authorName: String,
         authorAvatar: String? = nil, text: String, createdAt: Timestamp = Timestamp()) {
        self.id = id
        self.authorId = authorId
        self.authorName = authorName
        self.authorAvatar = authorAvatar
        self.text = text
        self.createdAt = createdAt
    }
}

// MARK: - Module Model
struct Module: Codable, Identifiable {
    @DocumentID var id: String?
    let title: String
    let description: String
    let order: Int
    let isCompleted: Bool
    let lessons: [Lesson]
    let estimatedDuration: String
    let category: String
    
    enum CodingKeys: String, CodingKey {
        case id
        case title
        case description
        case order
        case isCompleted = "is_completed"
        case lessons
        case estimatedDuration = "estimated_duration"
        case category
    }
    
    init(id: String? = nil, title: String, description: String, order: Int = 0,
         isCompleted: Bool = false, lessons: [Lesson] = [], estimatedDuration: String = "30 min",
         category: String = "Mindset") {
        self.id = id
        self.title = title
        self.description = description
        self.order = order
        self.isCompleted = isCompleted
        self.lessons = lessons
        self.estimatedDuration = estimatedDuration
        self.category = category
    }
}

// MARK: - Lesson Model
struct Lesson: Codable, Identifiable {
    let id: String
    let title: String
    let content: String
    let videoURL: String?
    let duration: String
    let isCompleted: Bool
    let order: Int
    
    enum CodingKeys: String, CodingKey {
        case id
        case title
        case content
        case videoURL = "video_url"
        case duration
        case isCompleted = "is_completed"
        case order
    }
    
    init(id: String = UUID().uuidString, title: String, content: String, videoURL: String? = nil,
         duration: String = "10 min", isCompleted: Bool = false, order: Int = 0) {
        self.id = id
        self.title = title
        self.content = content
        self.videoURL = videoURL
        self.duration = duration
        self.isCompleted = isCompleted
        self.order = order
    }
}

// MARK: - Service Event Model
struct ServiceEvent: Codable, Identifiable {
    @DocumentID var id: String?
    let title: String
    let description: String
    let date: Timestamp
    let location: String
    let attendees: Int
    let maxAttendees: Int?
    let imageURL: String?
    let category: String
    
    enum CodingKeys: String, CodingKey {
        case id
        case title
        case description
        case date
        case location
        case attendees
        case maxAttendees = "max_attendees"
        case imageURL = "image_url"
        case category
    }
    
    init(id: String? = nil, title: String, description: String, date: Timestamp,
         location: String, attendees: Int = 0, maxAttendees: Int? = nil,
         imageURL: String? = nil, category: String = "Service") {
        self.id = id
        self.title = title
        self.description = description
        self.date = date
        self.location = location
        self.attendees = attendees
        self.maxAttendees = maxAttendees
        self.imageURL = imageURL
        self.category = category
    }
}

// MARK: - User State Model for local storage
struct UserState: Codable {
    let checkedHabits: [String: Bool] // habitId: isChecked
    let lastActiveDate: String // YYYY-MM-DD format
    let completedModules: [String] // module IDs
    let rsvpdEvents: [String] // event IDs
    
    init(checkedHabits: [String: Bool] = [:], lastActiveDate: String = "",
         completedModules: [String] = [], rsvpdEvents: [String] = []) {
        self.checkedHabits = checkedHabits
        self.lastActiveDate = lastActiveDate
        self.completedModules = completedModules
        self.rsvpdEvents = rsvpdEvents
    }
} 