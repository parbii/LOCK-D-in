import SwiftUI

struct MainTabView: View {
    @State private var selectedTab: TabItem = .dashboard
    
    enum TabItem: CaseIterable {
        case dashboard
        case goals
        case lessons
        case communities
        case profile
        
        var title: String {
            switch self {
            case .dashboard: return "Dashboard"
            case .goals: return "Goals"
            case .lessons: return "Lessons"
            case .communities: return "Communities"
            case .profile: return "Profile"
            }
        }
        
        var icon: String {
            switch self {
            case .dashboard: return "newspaper"
            case .goals: return "target"
            case .lessons: return "brain.head.profile"
            case .communities: return "person.3"
            case .profile: return "person.circle"
            }
        }
        
        var selectedIcon: String {
            switch self {
            case .dashboard: return "newspaper.fill"
            case .goals: return "target"
            case .lessons: return "brain.head.profile"
            case .communities: return "person.3.fill"
            case .profile: return "person.circle.fill"
            }
        }
    }
    
    var body: some View {
        TabView(selection: $selectedTab) {
            DashboardView()
                .tabItem {
                    Image(systemName: selectedTab == .dashboard ? TabItem.dashboard.selectedIcon : TabItem.dashboard.icon)
                    Text(TabItem.dashboard.title)
                }
                .tag(TabItem.dashboard)
            
            GoalsView()
                .tabItem {
                    Image(systemName: selectedTab == .goals ? TabItem.goals.selectedIcon : TabItem.goals.icon)
                    Text(TabItem.goals.title)
                }
                .tag(TabItem.goals)
            
            LessonsView()
                .tabItem {
                    Image(systemName: selectedTab == .lessons ? TabItem.lessons.selectedIcon : TabItem.lessons.icon)
                    Text(TabItem.lessons.title)
                }
                .tag(TabItem.lessons)
            
            CommunitiesView()
                .tabItem {
                    Image(systemName: selectedTab == .communities ? TabItem.communities.selectedIcon : TabItem.communities.icon)
                    Text(TabItem.communities.title)
                }
                .tag(TabItem.communities)
            
            ProfileView()
                .tabItem {
                    Image(systemName: selectedTab == .profile ? TabItem.profile.selectedIcon : TabItem.profile.icon)
                    Text(TabItem.profile.title)
                }
                .tag(TabItem.profile)
        }
        .accentColor(Color.accentColor)
    }
}

#Preview {
    MainTabView()
        .environmentObject(AuthenticationService())
        .environmentObject(FirebaseService())
} 