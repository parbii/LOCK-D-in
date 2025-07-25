import Foundation
import FirebaseAuth
import GoogleSignIn
import AuthenticationServices
import Combine

@MainActor
class AuthenticationService: ObservableObject {
    @Published var isAuthenticated = false
    @Published var currentUser: User?
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    private var cancellables = Set<AnyCancellable>()
    
    init() {
        // Listen for auth state changes
        Auth.auth().addStateDidChangeListener { [weak self] _, user in
            Task { @MainActor in
                self?.currentUser = user
                self?.isAuthenticated = user != nil
            }
        }
    }
    
    // MARK: - Email/Password Authentication
    
    func signIn(email: String, password: String) async {
        isLoading = true
        errorMessage = nil
        
        do {
            let result = try await Auth.auth().signIn(withEmail: email, password: password)
            currentUser = result.user
            isAuthenticated = true
        } catch {
            errorMessage = error.localizedDescription
        }
        
        isLoading = false
    }
    
    func signUp(email: String, password: String, username: String) async {
        isLoading = true
        errorMessage = nil
        
        do {
            let result = try await Auth.auth().createUser(withEmail: email, password: password)
            
            // Update display name
            let changeRequest = result.user.createProfileChangeRequest()
            changeRequest.displayName = username
            try await changeRequest.commitChanges()
            
            currentUser = result.user
            isAuthenticated = true
        } catch {
            errorMessage = error.localizedDescription
        }
        
        isLoading = false
    }
    
    func resetPassword(email: String) async {
        isLoading = true
        errorMessage = nil
        
        do {
            try await Auth.auth().sendPasswordReset(withEmail: email)
        } catch {
            errorMessage = error.localizedDescription
        }
        
        isLoading = false
    }
    
    // MARK: - Google Sign In
    
    func signInWithGoogle() async {
        guard let presentingViewController = await UIApplication.shared.windows.first?.rootViewController else {
            errorMessage = "Unable to find root view controller"
            return
        }
        
        isLoading = true
        errorMessage = nil
        
        do {
            guard let result = try await GIDSignIn.sharedInstance.signIn(withPresenting: presentingViewController) else {
                errorMessage = "Google Sign In was cancelled"
                isLoading = false
                return
            }
            
            let user = result.user
            guard let idToken = user.idToken?.tokenString else {
                errorMessage = "Failed to get ID token from Google"
                isLoading = false
                return
            }
            
            let credential = GoogleAuthProvider.credential(withIDToken: idToken,
                                                         accessToken: user.accessToken.tokenString)
            
            let authResult = try await Auth.auth().signIn(with: credential)
            currentUser = authResult.user
            isAuthenticated = true
        } catch {
            errorMessage = error.localizedDescription
        }
        
        isLoading = false
    }
    
    // MARK: - Apple Sign In
    
    func signInWithApple() async {
        let request = ASAuthorizationAppleIDProvider().createRequest()
        request.requestedScopes = [.email, .fullName]
        
        let controller = ASAuthorizationController(authorizationRequests: [request])
        // Note: In a real implementation, you'd need to handle the delegate methods
        // This is simplified for the example
    }
    
    // MARK: - Sign Out
    
    func signOut() {
        do {
            try Auth.auth().signOut()
            currentUser = nil
            isAuthenticated = false
        } catch {
            errorMessage = error.localizedDescription
        }
    }
    
    // MARK: - Helper Methods
    
    func clearError() {
        errorMessage = nil
    }
} 