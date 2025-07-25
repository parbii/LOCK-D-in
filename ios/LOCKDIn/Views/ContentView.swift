import SwiftUI

struct ContentView: View {
    @EnvironmentObject var authService: AuthenticationService
    
    var body: some View {
        Group {
            if authService.isAuthenticated {
                MainTabView()
            } else {
                AuthenticationView()
            }
        }
        .animation(.easeInOut(duration: 0.3), value: authService.isAuthenticated)
    }
}

#Preview {
    ContentView()
        .environmentObject(AuthenticationService())
        .environmentObject(FirebaseService())
} 