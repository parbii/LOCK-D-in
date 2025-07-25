import Foundation
import Combine

@MainActor
class GoalsManager: ObservableObject {
    @Published var goals: [Goal] = []
    @Published var activeGoals: [Goal] = []
    @Published var checkedHabits: [String: Bool] = [:]
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    private var listener: ListenerRegistration?
    
    init() {
        loadCheckedHabitsFromStorage()
    }
    
    deinit {
        listener?.remove()
    }
    
    // MARK: - Goals Loading
    
    func loadGoals(userId: String, firebaseService: FirebaseService) async {
        isLoading = true
        errorMessage = nil
        
        do {
            let loadedGoals = try await firebaseService.getUserGoals(userId: userId)
            goals = loadedGoals
            updateActiveGoals()
            setupRealtimeListener(userId: userId, firebaseService: firebaseService)
        } catch {
            errorMessage = error.localizedDescription
            // Load sample goals for development
            loadSampleGoals()
        }
        
        isLoading = false
    }
    
    private func setupRealtimeListener(userId: String, firebaseService: FirebaseService) {
        listener?.remove()
        listener = firebaseService.listenToUserGoals(userId: userId) { [weak self] goals in
            Task { @MainActor in
                self?.goals = goals
                self?.updateActiveGoals()
            }
        }
    }
    
    private func updateActiveGoals() {
        activeGoals = goals.filter { !$0.isCompleted }
        updateTodaysProgress()
    }
    
    // MARK: - Habit Management
    
    func toggleHabitCompletion(habitId: String, goalId: String) {
        let currentState = checkedHabits[habitId] ?? false
        checkedHabits[habitId] = !currentState
        
        // Update goal progress
        updateGoalProgress(goalId: goalId)
        
        // Save to local storage
        saveCheckedHabitsToStorage()
    }
    
    private func updateGoalProgress(goalId: String) {
        guard let goalIndex = goals.firstIndex(where: { $0.id == goalId }) else { return }
        
        let goal = goals[goalIndex]
        let completedHabits = goal.habits.filter { checkedHabits[$0.id] ?? false }.count
        let totalHabits = goal.habits.count
        
        if totalHabits > 0 {
            let newProgress = (Double(completedHabits) / Double(totalHabits)) * 100
            
            // Create updated goal
            var updatedGoal = goal
            
            // Check if all habits are completed for the day
            if completedHabits == totalHabits && getTodaysDate() != goal.lastCompleted {
                // Increment streak and update last completed date
                let newStreak = goal.streak + 1
                let exponentialBonus = calculateExponentialBonus(streak: newStreak)
                let finalProgress = min(newProgress + exponentialBonus, 100)
                
                updatedGoal = Goal(
                    id: goal.id,
                    name: goal.name,
                    description: goal.description,
                    category: goal.category,
                    targetDate: goal.targetDate,
                    isCompleted: finalProgress >= 100,
                    createdAt: goal.createdAt,
                    progress: finalProgress,
                    streak: newStreak,
                    lastCompleted: getTodaysDate(),
                    habits: goal.habits
                )
            } else {
                updatedGoal = Goal(
                    id: goal.id,
                    name: goal.name,
                    description: goal.description,
                    category: goal.category,
                    targetDate: goal.targetDate,
                    isCompleted: goal.isCompleted,
                    createdAt: goal.createdAt,
                    progress: newProgress,
                    streak: goal.streak,
                    lastCompleted: goal.lastCompleted,
                    habits: goal.habits
                )
            }
            
            goals[goalIndex] = updatedGoal
            updateActiveGoals()
        }
    }
    
    private func calculateExponentialBonus(streak: Int) -> Double {
        // Exponential growth: base progress + (streak * 2)
        return Double(streak * 2)
    }
    
    private func updateTodaysProgress() {
        let today = getTodaysDate()
        
        // Reset habits if it's a new day
        if UserDefaults.standard.string(forKey: "lastActiveDate") != today {
            checkedHabits.removeAll()
            UserDefaults.standard.set(today, forKey: "lastActiveDate")
            saveCheckedHabitsToStorage()
        }
    }
    
    // MARK: - Goal CRUD Operations
    
    func addGoal(_ goal: Goal, userId: String, firebaseService: FirebaseService) async {
        do {
            try await firebaseService.createGoal(userId: userId, goal: goal)
            // The real-time listener will update the local state
        } catch {
            errorMessage = error.localizedDescription
        }
    }
    
    func updateGoal(_ goal: Goal, userId: String, firebaseService: FirebaseService) async {
        do {
            try await firebaseService.updateGoal(userId: userId, goal: goal)
            // The real-time listener will update the local state
        } catch {
            errorMessage = error.localizedDescription
        }
    }
    
    func deleteGoal(goalId: String, userId: String, firebaseService: FirebaseService) async {
        do {
            try await firebaseService.deleteGoal(userId: userId, goalId: goalId)
            // The real-time listener will update the local state
        } catch {
            errorMessage = error.localizedDescription
        }
    }
    
    // MARK: - Local Storage
    
    private func saveCheckedHabitsToStorage() {
        if let data = try? JSONEncoder().encode(checkedHabits) {
            UserDefaults.standard.set(data, forKey: "checkedHabits")
        }
    }
    
    private func loadCheckedHabitsFromStorage() {
        if let data = UserDefaults.standard.data(forKey: "checkedHabits"),
           let savedHabits = try? JSONDecoder().decode([String: Bool].self, from: data) {
            checkedHabits = savedHabits
        }
    }
    
    // MARK: - Helper Methods
    
    func getTodaysDate() -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter.string(from: Date())
    }
    
    func clearError() {
        errorMessage = nil
    }
    
    // MARK: - Sample Data (for development)
    
    private func loadSampleGoals() {
        goals = [
            Goal(
                id: "sample1",
                name: "Daily Reading",
                description: "Read for 30 minutes every day",
                category: "Education",
                progress: 45,
                streak: 7,
                habits: [
                    Habit(text: "Read for 30 minutes"),
                    Habit(text: "Take notes on key insights"),
                    Habit(text: "Reflect on what you learned")
                ]
            ),
            Goal(
                id: "sample2",
                name: "Fitness Routine",
                description: "Complete daily workout",
                category: "Health",
                progress: 80,
                streak: 12,
                habits: [
                    Habit(text: "30 minute workout"),
                    Habit(text: "Drink 8 glasses of water"),
                    Habit(text: "10 minutes of stretching")
                ]
            ),
            Goal(
                id: "sample3",
                name: "Mindfulness Practice",
                description: "Daily meditation and gratitude",
                category: "Mental Health",
                progress: 25,
                streak: 3,
                habits: [
                    Habit(text: "10 minutes of meditation"),
                    Habit(text: "Write 3 things you're grateful for"),
                    Habit(text: "Practice deep breathing")
                ]
            )
        ]
        
        updateActiveGoals()
    }
} 