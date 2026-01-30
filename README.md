# fastivalle

## Android build on Windows – "Could not move temporary workspace" fix

If the Android build fails with **Could not move temporary workspace ... to immutable location**:

1. **Stop Gradle daemons** (in project root):
   ```bat
   cd android
   gradlew.bat --stop
   cd ..
   ```

2. **Close** Android Studio / any IDE and **temporarily exclude** the project folder from antivirus real-time scan (optional but helps).

3. **Delete the Gradle cache** in the project:
   - Delete the folder: `android\.gradle`
   - Or run: `npm run android:clean`

4. **Build again:**
   ```bat
   npm run android
   ```

If the error persists, also delete the global Gradle cache: `%USERPROFILE%\.gradle\caches` (or run `gradlew.bat --stop` from `android` and delete `android\.gradle` again after a reboot).