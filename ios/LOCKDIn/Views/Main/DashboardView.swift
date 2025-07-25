import SwiftUI

struct DashboardView: View {
    @EnvironmentObject var firebaseService: FirebaseService
    @EnvironmentObject var authService: AuthenticationService
    @StateObject private var goalsManager = GoalsManager()
    @State private var posts: [Post] = []
    @State private var showingCreatePost = false
    
    var body: some View {
        NavigationView {
            ScrollView {
                LazyVStack(spacing: 16) {
                    // Daily Habits Tracker
                    if !goalsManager.activeGoals.isEmpty {
                        DailyHabitsCard(goalsManager: goalsManager)
                    }
                    
                    // Module Progress Tracker
                    ModuleProgressCard()
                    
                    // RSVP Events
                    RSVPEventsCard()
                    
                    // Create Post Section
                    CreatePostCard(onCreatePost: handleCreatePost)
                    
                    // Posts Feed
                    ForEach(posts) { post in
                        PostCard(post: post, onUpdatePost: handleUpdatePost)
                    }
                }
                .padding()
            }
            .navigationTitle("Dashboard")
            .navigationBarTitleDisplayMode(.large)
            .refreshable {
                await loadDashboardData()
            }
        }
        .task {
            await loadDashboardData()
        }
    }
    
    // MARK: - Helper Methods
    
    private func loadDashboardData() async {
        guard let userId = authService.currentUser?.uid else { return }
        
        // Load goals
        await goalsManager.loadGoals(userId: userId, firebaseService: firebaseService)
        
        // Load posts (for now, we'll use sample data)
        // In a real app, you'd load from Firebase
        loadSamplePosts()
    }
    
    private func loadSamplePosts() {
        posts = [
            Post(
                authorId: "current_user",
                authorName: "Current User",
                content: "Just completed my daily reading habit! 📚 Building consistency one day at a time.",
                likesCount: 5,
                commentsCount: 2
            ),
            Post(
                authorId: "user2",
                authorName: "Alex Johnson",
                content: "Finished Module 3: Resilience today. The lesson on overcoming setbacks really resonated with me. Can't wait to apply these concepts!",
                likesCount: 12,
                commentsCount: 4
            )
        ]
    }
    
    private func handleCreatePost(content: String, attachedGoal: Goal?) {
        var postContent = content
        if let goal = attachedGoal {
            postContent = "Attached Goal: \(goal.name)\n\n\(content)"
        }
        
        let newPost = Post(
            authorId: authService.currentUser?.uid ?? "current_user",
            authorName: authService.currentUser?.displayName ?? "Current User",
            content: postContent
        )
        
        posts.insert(newPost, at: 0)
        
        // In a real app, you'd save to Firebase here
    }
    
    private func handleUpdatePost(_ updatedPost: Post) {
        if let index = posts.firstIndex(where: { $0.id == updatedPost.id }) {
            posts[index] = updatedPost
        }
    }
}

// MARK: - Daily Habits Card
struct DailyHabitsCard: View {
    @ObservedObject var goalsManager: GoalsManager
    
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Image(systemName: "target")
                    .font(.title2)
                    .foregroundColor(.accentColor)
                Text("Today's Habits")
                    .font(.title2)
                    .fontWeight(.semibold)
            }
            
            Text("Check off your habits for the day to build your streak.")
                .font(.subheadline)
                .foregroundColor(.secondary)
            
            ForEach(goalsManager.activeGoals) { goal in
                GoalHabitRow(goal: goal, goalsManager: goalsManager)
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(12)
        .shadow(color: Color.black.opacity(0.1), radius: 2, x: 0, y: 1)
    }
}

struct GoalHabitRow: View {
    let goal: Goal
    @ObservedObject var goalsManager: GoalsManager
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Goal header
            HStack {
                Text(goal.name)
                    .font(.headline)
                    .fontWeight(.medium)
                
                Spacer()
                
                HStack(spacing: 8) {
                    if goal.streak > 0 {
                        Image(systemName: "flame.fill")
                            .foregroundColor(.orange)
                        Text("\(goal.streak)")
                            .fontWeight(.semibold)
                    }
                    
                    if goal.progress >= 100 {
                        Image(systemName: "lock.fill")
                            .foregroundColor(.accentColor)
                    } else {
                        Text("\(Int(goal.progress))%")
                            .fontWeight(.medium)
                    }
                }
                .font(.subheadline)
            }
            
            // Progress bar
            ProgressView(value: goal.progress / 100)
                .progressViewStyle(LinearProgressViewStyle(tint: .accentColor))
            
            // Streak indicator
            if goal.streak > 0 {
                HStack {
                    Spacer()
                    HStack(spacing: 4) {
                        Image(systemName: "flame.fill")
                            .foregroundColor(.orange)
                        Text("\(goal.streak) day streak!")
                            .fontWeight(.medium)
                    }
                    .font(.caption)
                    .foregroundColor(.orange)
                }
            }
            
            // Habits
            ForEach(goal.habits) { habit in
                HabitCheckRow(habit: habit, goalId: goal.id ?? "", goalsManager: goalsManager)
            }
        }
        .padding()
        .background(Color(.systemGray6).opacity(0.3))
        .cornerRadius(8)
    }
}

struct HabitCheckRow: View {
    let habit: Habit
    let goalId: String
    @ObservedObject var goalsManager: GoalsManager
    
    var body: some View {
        HStack(spacing: 12) {
            Button(action: {
                goalsManager.toggleHabitCompletion(habitId: habit.id, goalId: goalId)
            }) {
                Image(systemName: habit.isCompleted ? "checkmark.circle.fill" : "circle")
                    .font(.title3)
                    .foregroundColor(habit.isCompleted ? .accentColor : .secondary)
            }
            
            Text(habit.text)
                .font(.subheadline)
                .strikethrough(habit.isCompleted)
                .foregroundColor(habit.isCompleted ? .secondary : .primary)
            
            Spacer()
        }
        .padding(.vertical, 4)
    }
}

#Preview {
    DashboardView()
        .environmentObject(AuthenticationService())
        .environmentObject(FirebaseService())
} 