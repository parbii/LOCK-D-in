import SwiftUI
import FirebaseCore
import FirebaseAuth

@main
struct LOCKDInApp: App {
    @StateObject private var authService = AuthenticationService()
    @StateObject private var firebaseService = FirebaseService()
    
    init() {
        FirebaseApp.configure()
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(authService)
                .environmentObject(firebaseService)
                .onAppear {
                    // Listen for auth state changes
                    Auth.auth().addStateDidChangeListener { _, user in
                        authService.currentUser = user
                        authService.isAuthenticated = user != nil
                    }
                }
        }
    }
} 