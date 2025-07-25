import SwiftUI

struct AuthenticationView: View {
    @State private var currentPage: AuthPage = .login
    
    enum AuthPage {
        case login
        case signup
        case forgotPassword
    }
    
    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                // Logo section
                VStack(spacing: 20) {
                    LogoView()
                }
                .padding(.top, 40)
                .padding(.bottom, 40)
                
                // Authentication content
                Group {
                    switch currentPage {
                    case .login:
                        LoginView(
                            onNavigateToSignup: { currentPage = .signup },
                            onNavigateToForgotPassword: { currentPage = .forgotPassword }
                        )
                    case .signup:
                        SignupView(
                            onNavigateToLogin: { currentPage = .login }
                        )
                    case .forgotPassword:
                        ForgotPasswordView(
                            onNavigateToLogin: { currentPage = .login }
                        )
                    }
                }
                .transition(.asymmetric(
                    insertion: .move(edge: .trailing).combined(with: .opacity),
                    removal: .move(edge: .leading).combined(with: .opacity)
                ))
                .animation(.easeInOut(duration: 0.3), value: currentPage)
                
                Spacer()
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(Color(.systemGray6).opacity(0.3))
            .navigationBarHidden(true)
        }
        .navigationViewStyle(StackNavigationViewStyle())
    }
}

struct LogoView: View {
    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: "lock.fill")
                .font(.system(size: 28, weight: .semibold))
                .foregroundColor(Color.accentColor)
            
            Text("LOCK*DIn")
                .font(.system(size: 32, weight: .bold, design: .default))
                .foregroundColor(.primary)
        }
    }
}

#Preview {
    AuthenticationView()
        .environmentObject(AuthenticationService())
        .environmentObject(FirebaseService())
} 