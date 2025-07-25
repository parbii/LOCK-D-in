import SwiftUI

// MARK: - Goals View
struct GoalsView: View {
    var body: some View {
        NavigationView {
            VStack {
                Image(systemName: "target")
                    .font(.system(size: 60))
                    .foregroundColor(.accentColor)
                    .padding()
                
                Text("Goals")
                    .font(.title)
                    .fontWeight(.semibold)
                
                Text("Track your personal development goals and build consistent habits.")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .padding()
                
                Text("Coming Soon!")
                    .font(.headline)
                    .foregroundColor(.accentColor)
                    .padding()
            }
            .navigationTitle("Goals")
        }
    }
}

// MARK: - Lessons View
struct LessonsView: View {
    var body: some View {
        NavigationView {
            VStack {
                Image(systemName: "brain.head.profile")
                    .font(.system(size: 60))
                    .foregroundColor(.accentColor)
                    .padding()
                
                Text("Mindset Modules")
                    .font(.title)
                    .fontWeight(.semibold)
                
                Text("Complete 10 structured modules for personal development and mindset transformation.")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .padding()
                
                Text("Coming Soon!")
                    .font(.headline)
                    .foregroundColor(.accentColor)
                    .padding()
            }
            .navigationTitle("Lessons")
        }
    }
}

// MARK: - Communities View
struct CommunitiesView: View {
    var body: some View {
        NavigationView {
            VStack {
                Image(systemName: "person.3")
                    .font(.system(size: 60))
                    .foregroundColor(.accentColor)
                    .padding()
                
                Text("Communities")
                    .font(.title)
                    .fontWeight(.semibold)
                
                Text("Join accountability communities and connect with like-minded individuals on their growth journey.")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .padding()
                
                Text("Coming Soon!")
                    .font(.headline)
                    .foregroundColor(.accentColor)
                    .padding()
            }
            .navigationTitle("Communities")
        }
    }
}

// MARK: - Profile View
struct ProfileView: View {
    @EnvironmentObject var authService: AuthenticationService
    
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                // Profile Image and Info
                VStack(spacing: 12) {
                    Image(systemName: "person.circle.fill")
                        .font(.system(size: 80))
                        .foregroundColor(.accentColor)
                    
                    Text(authService.currentUser?.displayName ?? "User")
                        .font(.title2)
                        .fontWeight(.semibold)
                    
                    Text(authService.currentUser?.email ?? "")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
                .padding()
                
                Spacer()
                
                // Sign Out Button
                Button(action: {
                    authService.signOut()
                }) {
                    Text("Sign Out")
                        .fontWeight(.medium)
                        .frame(maxWidth: .infinity)
                        .frame(height: 44)
                        .foregroundColor(.white)
                        .background(Color.red)
                        .cornerRadius(8)
                }
                .padding()
            }
            .navigationTitle("Profile")
        }
    }
}

// MARK: - Dashboard Component Placeholders

struct ModuleProgressCard: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Image(systemName: "brain.head.profile")
                    .font(.title2)
                    .foregroundColor(.accentColor)
                Text("Mindset Module Progress")
                    .font(.title2)
                    .fontWeight(.semibold)
            }
            
            Text("You've completed 0 out of 10 modules. Keep going!")
                .font(.subheadline)
                .foregroundColor(.secondary)
            
            ProgressView(value: 0.0)
                .progressViewStyle(LinearProgressViewStyle(tint: .accentColor))
            
            Button(action: {}) {
                Text("Continue Learning")
                    .fontWeight(.medium)
                    .frame(maxWidth: .infinity)
                    .frame(height: 40)
                    .foregroundColor(.white)
                    .background(Color.accentColor)
                    .cornerRadius(8)
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(12)
        .shadow(color: Color.black.opacity(0.1), radius: 2, x: 0, y: 1)
    }
}

struct RSVPEventsCard: View {
    var body: some View {
        // This will be empty unless there are RSVP'd events
        EmptyView()
    }
}

struct CreatePostCard: View {
    let onCreatePost: (String, Goal?) -> Void
    @State private var postText = ""
    @State private var showingGoalAttachment = false
    
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Create Post")
                .font(.title2)
                .fontWeight(.semibold)
            
            HStack(alignment: .top, spacing: 12) {
                Image(systemName: "person.circle.fill")
                    .font(.system(size: 40))
                    .foregroundColor(.accentColor)
                
                TextField("What's on your mind?", text: $postText, axis: .vertical)
                    .textFieldStyle(PlainTextFieldStyle())
                    .padding()
                    .background(Color(.systemGray6))
                    .cornerRadius(8)
                    .lineLimit(3...6)
            }
            
            HStack {
                Button(action: {}) {
                    Image(systemName: "photo")
                        .font(.system(size: 18))
                        .foregroundColor(.secondary)
                }
                
                Button(action: {}) {
                    Image(systemName: "target")
                        .font(.system(size: 18))
                        .foregroundColor(.secondary)
                }
                
                Button(action: {}) {
                    Image(systemName: "flame")
                        .font(.system(size: 18))
                        .foregroundColor(.secondary)
                }
                
                Spacer()
                
                Button(action: {
                    if !postText.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
                        onCreatePost(postText, nil)
                        postText = ""
                    }
                }) {
                    Text("Post")
                        .fontWeight(.medium)
                        .foregroundColor(.white)
                        .padding(.horizontal, 20)
                        .padding(.vertical, 8)
                        .background(Color.accentColor)
                        .cornerRadius(6)
                }
                .disabled(postText.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(12)
        .shadow(color: Color.black.opacity(0.1), radius: 2, x: 0, y: 1)
    }
}

struct PostCard: View {
    let post: Post
    let onUpdatePost: (Post) -> Void
    @State private var isLiked = false
    @State private var likesCount: Int
    
    init(post: Post, onUpdatePost: @escaping (Post) -> Void) {
        self.post = post
        self.onUpdatePost = onUpdatePost
        self._likesCount = State(initialValue: post.likesCount)
        self._isLiked = State(initialValue: post.liked)
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Post header
            HStack {
                Image(systemName: "person.circle.fill")
                    .font(.system(size: 40))
                    .foregroundColor(.accentColor)
                
                VStack(alignment: .leading, spacing: 2) {
                    Text(post.authorName)
                        .font(.headline)
                        .fontWeight(.medium)
                    
                    Text("Just now")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                
                Spacer()
                
                Button(action: {}) {
                    Image(systemName: "ellipsis")
                        .font(.system(size: 16))
                        .foregroundColor(.secondary)
                }
            }
            
            // Post content
            Text(post.content)
                .font(.body)
                .fixedSize(horizontal: false, vertical: true)
            
            // Post actions
            HStack(spacing: 20) {
                Button(action: {
                    isLiked.toggle()
                    likesCount += isLiked ? 1 : -1
                }) {
                    HStack(spacing: 4) {
                        Image(systemName: isLiked ? "heart.fill" : "heart")
                            .foregroundColor(isLiked ? .red : .secondary)
                        Text("\(likesCount)")
                            .foregroundColor(.secondary)
                    }
                    .font(.subheadline)
                }
                
                Button(action: {}) {
                    HStack(spacing: 4) {
                        Image(systemName: "bubble.right")
                            .foregroundColor(.secondary)
                        Text("\(post.commentsCount)")
                            .foregroundColor(.secondary)
                    }
                    .font(.subheadline)
                }
                
                Button(action: {}) {
                    Image(systemName: "paperplane")
                        .foregroundColor(.secondary)
                        .font(.subheadline)
                }
                
                Spacer()
                
                Button(action: {}) {
                    Image(systemName: "bookmark")
                        .foregroundColor(.secondary)
                        .font(.subheadline)
                }
            }
            .padding(.top, 8)
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(12)
        .shadow(color: Color.black.opacity(0.1), radius: 2, x: 0, y: 1)
    }
}

// MARK: - Placeholder Authentication Views

struct SignupView: View {
    let onNavigateToLogin: () -> Void
    
    var body: some View {
        VStack {
            Text("Sign Up")
                .font(.title)
                .padding()
            
            Text("Sign up functionality coming soon!")
                .padding()
            
            Button("Go to Login", action: onNavigateToLogin)
                .padding()
        }
    }
}

struct ForgotPasswordView: View {
    let onNavigateToLogin: () -> Void
    
    var body: some View {
        VStack {
            Text("Forgot Password")
                .font(.title)
                .padding()
            
            Text("Password reset functionality coming soon!")
                .padding()
            
            Button("Back to Login", action: onNavigateToLogin)
                .padding()
        }
    }
}

// MARK: - Previews

#Preview("Goals") {
    GoalsView()
}

#Preview("Lessons") {
    LessonsView()
}

#Preview("Communities") {
    CommunitiesView()
}

#Preview("Profile") {
    ProfileView()
        .environmentObject(AuthenticationService())
} 