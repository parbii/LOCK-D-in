# LOCK*DIn iOS App Setup Guide

This guide will help you set up and run the native iOS version of LOCK*DIn in Xcode.

## Prerequisites

- **Xcode 15.0+** (latest stable version recommended)
- **iOS 15.0+** target deployment
- **Apple Developer Account** (for running on physical devices)
- **Firebase Project** (should be the same as your web app)
- **CocoaPods** or **Swift Package Manager**

## 🚀 Quick Setup

### 1. Create New Xcode Project

1. Open Xcode
2. Create a new project: **File → New → Project**
3. Choose **iOS → App**
4. Configure your project:
   - **Product Name**: `LOCKDIn`
   - **Interface**: SwiftUI
   - **Language**: Swift
   - **Bundle Identifier**: `com.yourcompany.lockdin`
   - **Minimum Deployment**: iOS 15.0

### 2. Add Firebase Dependencies

#### Option A: Swift Package Manager (Recommended)
1. In Xcode: **File → Add Package Dependencies**
2. Enter URL: `https://github.com/firebase/firebase-ios-sdk`
3. Select **Up to Next Major Version**
4. Add these packages:
   - **FirebaseAuth**
   - **FirebaseFirestore**
   - **FirebaseStorage**
   - **GoogleSignIn**

#### Option B: CocoaPods
Create a `Podfile` in your project root:

```ruby
platform :ios, '15.0'
use_frameworks!

target 'LOCKDIn' do
  pod 'Firebase/Auth'
  pod 'Firebase/Firestore'
  pod 'Firebase/Storage'
  pod 'GoogleSignIn'
end
```

Run: `pod install`

### 3. Firebase Configuration

1. **Download Configuration File**:
   - Go to Firebase Console → Project Settings
   - Add iOS app with your bundle identifier
   - Download `GoogleService-Info.plist`
   - Drag into Xcode project (ensure "Add to target" is checked)

2. **Configure URL Schemes**:
   - Open `GoogleService-Info.plist`
   - Copy the `REVERSED_CLIENT_ID` value
   - In Xcode: Target → Info → URL Types → Add
   - Set URL Schemes to your `REVERSED_CLIENT_ID`

### 4. Add Project Files

Copy all the Swift files from the `ios/LOCKDIn/` directory structure into your Xcode project:

```
LOCKDIn/
├── LOCKDInApp.swift (App entry point)
├── Views/
│   ├── ContentView.swift
│   ├── Authentication/
│   │   ├── AuthenticationView.swift
│   │   └── LoginView.swift
│   ├── Main/
│   │   ├── MainTabView.swift
│   │   └── DashboardView.swift
│   ├── Components/
│   │   └── SocialLoginButtons.swift
│   └── Placeholder/
│       └── PlaceholderViews.swift
├── Services/
│   ├── AuthenticationService.swift
│   └── FirebaseService.swift
├── Models/
│   └── DataModels.swift
├── ViewModels/
│   └── GoalsManager.swift
└── Supporting Files/
    └── Info.plist
```

### 5. Configure App Settings

1. **Update Info.plist** (replace the default one):
   - Set display name to "LOCK*DIn"
   - Configure URL schemes for Google Sign-In
   - Set minimum iOS version to 15.0

2. **Set Accent Color**:
   - In Assets.xcassets, modify AccentColor
   - Set to your brand pink: `#E91E63` (or RGB: 233, 30, 99)

### 6. Configure Firebase Security Rules

Update your Firestore security rules to match the iOS app:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Users can read/write their own goals
      match /goals/{goalId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
    
    // Communities are readable by authenticated users
    match /communities/{communityId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null; // Add more specific rules as needed
      
      match /posts/{postId} {
        allow read: if request.auth != null;
        allow create: if request.auth != null;
        allow update, delete: if request.auth != null && request.auth.uid == resource.data.authorId;
      }
    }
  }
}
```

## 🏗 Project Structure

The iOS app follows MVVM architecture and mirrors your Next.js web app:

### Architecture Overview
- **SwiftUI** for UI (equivalent to React)
- **Combine** for reactive programming (equivalent to React hooks)
- **Firebase** for backend (same as web app)
- **MVVM** pattern for clean separation

### Key Components

1. **Authentication Flow**:
   - `AuthenticationService`: Handles login, signup, social auth
   - `LoginView`: Mirrors your Next.js login page
   - Firebase Auth integration

2. **Main App**:
   - `MainTabView`: Tab-based navigation
   - `DashboardView`: Mirrors web dashboard with goals and posts
   - `GoalsManager`: State management for goals (like React Context)

3. **Data Layer**:
   - `FirebaseService`: All Firestore operations
   - `DataModels`: Swift structs matching your Firestore schema
   - Real-time listeners for live updates

## 🎨 Design System

The iOS app uses the same design principles as your web app:

### Colors
- **Primary**: Gray tones (`UIColor.label`, `UIColor.systemGray`)
- **Accent**: Hot Pink (`#E91E63`)
- **Background**: System backgrounds for light/dark mode

### Typography
- **System Font**: San Francisco (iOS default)
- **Hierarchy**: `.title`, `.headline`, `.body`, `.caption`
- **Weight**: `.medium`, `.semibold`, `.bold`

### Components
- Cards with rounded corners (12pt radius)
- Consistent spacing (8pt grid system)
- SF Symbols for icons (equivalent to Lucide icons)
- Native iOS form elements

## 🔧 Development Workflow

### Running the App
1. Select target device/simulator
2. Press **Cmd+R** to build and run
3. Test on both simulator and physical device

### Testing Authentication
1. Test email/password login
2. Test Google Sign-In (requires physical device)
3. Test Apple Sign-In (requires physical device)

### Debugging
- Use Xcode's debugger and console
- Firebase has excellent logging for auth issues
- Use SwiftUI previews for UI development

## 📱 Key Features Implemented

✅ **Authentication System**
- Email/password login
- Google Sign-In integration
- Apple Sign-In ready (needs completion)
- Password reset flow (placeholder)

✅ **Dashboard**
- Goal tracking with exponential progress
- Habit completion checkboxes
- Post creation and feed
- Real-time updates

✅ **Navigation**
- Tab-based navigation
- Smooth transitions
- Proper state management

✅ **Data Synchronization**
- Real-time Firestore listeners
- Local state management
- Automatic updates

## 🚧 Next Steps (Coming Soon)

The following features are ready for implementation:

1. **Complete Authentication Views**:
   - Signup form with validation
   - Password reset functionality
   - Apple Sign-In completion

2. **Goals Management**:
   - Goal creation/editing forms
   - Goal categories and filtering
   - Goal completion celebrations

3. **Communities**:
   - Community browsing and joining
   - Community posts and discussions
   - Real-time community updates

4. **Mindset Modules**:
   - Module content display
   - Video integration
   - Progress tracking

5. **Profile Management**:
   - Profile editing
   - Achievement system
   - Settings and preferences

## 🔐 Security Considerations

- Firebase security rules protect user data
- Apple App Transport Security (ATS) enabled
- Secure storage using Keychain (automatic with Firebase)
- No sensitive data in UserDefaults

## 📊 Performance

- LazyVStack for efficient scrolling
- Image caching for profile pictures
- Efficient Firestore queries with pagination
- Real-time listeners only for active views

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Configuration**:
   - Ensure `GoogleService-Info.plist` is in project
   - Check bundle identifier matches Firebase project
   - Verify URL schemes are configured

2. **Google Sign-In**:
   - Must test on physical device
   - Check reversed client ID in Info.plist
   - Ensure Google Sign-In is enabled in Firebase Console

3. **Build Errors**:
   - Clean build folder: **Product → Clean Build Folder**
   - Reset package cache: **File → Packages → Reset Package Caches**
   - Check minimum deployment target

### Firebase Debugging
```swift
// Add to AppDelegate for debugging
FirebaseConfiguration.shared.setLoggerLevel(.debug)
```

## 📱 Deployment

### TestFlight (Beta Testing)
1. Archive the app: **Product → Archive**
2. Upload to App Store Connect
3. Add beta testers
4. Distribute via TestFlight

### App Store Release
1. Complete app review requirements
2. Add app metadata and screenshots
3. Submit for review
4. Release to App Store

## 🤝 Contributing

The iOS app follows the same development guidelines as the web app:

- Keep files under 200-300 lines
- Use descriptive naming conventions
- Follow MVVM architecture
- Write clean, readable code
- Test on both simulator and device

---

**Built with ❤️ for personal growth and community development**

For questions or issues, refer to the main project documentation or create an issue in the GitHub repository. 