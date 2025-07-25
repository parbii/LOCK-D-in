import SwiftUI

struct SocialLoginButtons: View {
    @EnvironmentObject var authService: AuthenticationService
    
    var body: some View {
        VStack(spacing: 16) {
            // Divider with text
            HStack {
                Rectangle()
                    .frame(height: 1)
                    .foregroundColor(Color(.systemGray4))
                
                Text("Or continue with")
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .padding(.horizontal, 12)
                
                Rectangle()
                    .frame(height: 1)
                    .foregroundColor(Color(.systemGray4))
            }
            .padding(.vertical, 8)
            
            // Social login buttons
            VStack(spacing: 12) {
                // Google Sign In
                Button(action: handleGoogleSignIn) {
                    HStack(spacing: 12) {
                        Image(systemName: "globe")
                            .font(.system(size: 18, weight: .medium))
                        Text("Google")
                            .fontWeight(.medium)
                    }
                    .frame(maxWidth: .infinity)
                    .frame(height: 44)
                    .foregroundColor(.primary)
                    .background(Color(.systemGray6))
                    .cornerRadius(8)
                }
                .disabled(authService.isLoading)
                
                // Apple Sign In
                Button(action: handleAppleSignIn) {
                    HStack(spacing: 12) {
                        Image(systemName: "apple.logo")
                            .font(.system(size: 18, weight: .medium))
                        Text("Apple")
                            .fontWeight(.medium)
                    }
                    .frame(maxWidth: .infinity)
                    .frame(height: 44)
                    .foregroundColor(.primary)
                    .background(Color(.systemGray6))
                    .cornerRadius(8)
                }
                .disabled(authService.isLoading)
            }
        }
    }
    
    // MARK: - Helper Methods
    
    private func handleGoogleSignIn() {
        Task {
            await authService.signInWithGoogle()
        }
    }
    
    private func handleAppleSignIn() {
        Task {
            await authService.signInWithApple()
        }
    }
}

#Preview {
    SocialLoginButtons()
        .environmentObject(AuthenticationService())
        .padding()
} 