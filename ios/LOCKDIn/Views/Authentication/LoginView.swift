import SwiftUI

struct LoginView: View {
    @EnvironmentObject var authService: AuthenticationService
    @State private var email = ""
    @State private var password = ""
    @State private var showPassword = false
    @State private var emailError: String?
    @State private var passwordError: String?
    
    let onNavigateToSignup: () -> Void
    let onNavigateToForgotPassword: () -> Void
    
    var body: some View {
        VStack(spacing: 0) {
            // Card container
            VStack(spacing: 24) {
                // Header
                VStack(spacing: 8) {
                    Text("Welcome Back")
                        .font(.title2)
                        .fontWeight(.semibold)
                        .foregroundColor(.primary)
                    
                    Text("Sign in to get LOCK*D IN")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
                .padding(.top, 24)
                
                // Form content
                VStack(spacing: 20) {
                    // Email field
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Email")
                            .font(.subheadline)
                            .fontWeight(.medium)
                            .foregroundColor(.primary)
                        
                        TextField("name@example.com", text: $email)
                            .textFieldStyle(CustomTextFieldStyle())
                            .keyboardType(.emailAddress)
                            .autocapitalization(.none)
                            .autocorrectionDisabled()
                            .onChange(of: email) { _ in
                                validateEmail()
                            }
                        
                        if let emailError = emailError {
                            Text(emailError)
                                .font(.caption)
                                .foregroundColor(.red)
                        }
                    }
                    
                    // Password field
                    VStack(alignment: .leading, spacing: 8) {
                        HStack {
                            Text("Password")
                                .font(.subheadline)
                                .fontWeight(.medium)
                                .foregroundColor(.primary)
                            
                            Spacer()
                            
                            Button(action: onNavigateToForgotPassword) {
                                Text("Forgot password?")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                                    .underline()
                            }
                        }
                        
                        HStack {
                            if showPassword {
                                TextField("••••••••", text: $password)
                                    .textFieldStyle(PlainTextFieldStyle())
                            } else {
                                SecureField("••••••••", text: $password)
                                    .textFieldStyle(PlainTextFieldStyle())
                            }
                            
                            Button(action: { showPassword.toggle() }) {
                                Image(systemName: showPassword ? "eye.slash" : "eye")
                                    .font(.system(size: 16))
                                    .foregroundColor(.secondary)
                            }
                        }
                        .padding()
                        .background(Color(.systemGray6))
                        .cornerRadius(8)
                        .onChange(of: password) { _ in
                            validatePassword()
                        }
                        
                        if let passwordError = passwordError {
                            Text(passwordError)
                                .font(.caption)
                                .foregroundColor(.red)
                        }
                    }
                    
                    // Sign in button
                    Button(action: handleSignIn) {
                        HStack {
                            if authService.isLoading {
                                ProgressView()
                                    .progressViewStyle(CircularProgressViewStyle(tint: .white))
                                    .scaleEffect(0.8)
                            }
                            Text("Sign In")
                                .fontWeight(.medium)
                        }
                        .frame(maxWidth: .infinity)
                        .frame(height: 44)
                        .foregroundColor(.white)
                        .background(Color.accentColor)
                        .cornerRadius(8)
                    }
                    .disabled(authService.isLoading || !isFormValid)
                    .opacity(authService.isLoading || !isFormValid ? 0.6 : 1.0)
                    
                    // Social logins
                    SocialLoginButtons()
                }
                .padding(.horizontal, 24)
                .padding(.bottom, 24)
            }
            .background(Color(.systemBackground))
            .cornerRadius(12)
            .shadow(color: Color.black.opacity(0.1), radius: 5, x: 0, y: 2)
            .padding(.horizontal, 20)
            
            // Sign up link
            HStack {
                Text("Don't have an account?")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                
                Button(action: onNavigateToSignup) {
                    Text("Sign up")
                        .font(.subheadline)
                        .fontWeight(.medium)
                        .foregroundColor(.accentColor)
                }
            }
            .padding(.top, 24)
        }
        .alert("Sign In Error", isPresented: .constant(authService.errorMessage != nil)) {
            Button("OK") {
                authService.clearError()
            }
        } message: {
            Text(authService.errorMessage ?? "")
        }
    }
    
    // MARK: - Helper Methods
    
    private var isFormValid: Bool {
        !email.isEmpty && !password.isEmpty && emailError == nil && passwordError == nil
    }
    
    private func validateEmail() {
        if email.isEmpty {
            emailError = nil
        } else if !isValidEmail(email) {
            emailError = "Please enter a valid email."
        } else {
            emailError = nil
        }
    }
    
    private func validatePassword() {
        if password.isEmpty {
            passwordError = nil
        } else if password.count < 1 {
            passwordError = "Password is required."
        } else {
            passwordError = nil
        }
    }
    
    private func isValidEmail(_ email: String) -> Bool {
        let emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}"
        let emailPredicate = NSPredicate(format: "SELF MATCHES %@", emailRegex)
        return emailPredicate.evaluate(with: email)
    }
    
    private func handleSignIn() {
        validateEmail()
        validatePassword()
        
        guard isFormValid else { return }
        
        Task {
            await authService.signIn(email: email, password: password)
        }
    }
}

struct CustomTextFieldStyle: TextFieldStyle {
    func _body(configuration: TextField<Self._Label>) -> some View {
        configuration
            .padding()
            .background(Color(.systemGray6))
            .cornerRadius(8)
    }
}

#Preview {
    LoginView(
        onNavigateToSignup: {},
        onNavigateToForgotPassword: {}
    )
    .environmentObject(AuthenticationService())
} 