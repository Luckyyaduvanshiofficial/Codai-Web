# 🛠️ How to Build Windows Installer

## Prerequisites

1. **Inno Setup Compiler**
   - Download: https://jrsoftware.org/isdl.php
   - Install the latest version (6.x)

2. **Your Application Files**
   - Built executable (`codai.exe`)
   - All dependencies in `dist/` folder
   - Icon file (`icon.ico`)
   - License file (`LICENSE.txt`)

---

## Method 1: Using Inno Setup (Recommended) ⭐

### Step 1: Prepare Files

```
your-project/
├── dist/
│   ├── codai.exe          ← Main executable
│   ├── _internal/         ← Dependencies (if using PyInstaller)
│   └── ...
├── icon.ico               ← Application icon
├── LICENSE.txt            ← License file
└── installer-setup.iss    ← Inno Setup script
```

### Step 2: Edit installer-setup.iss

1. Open `installer-setup.iss` in Inno Setup
2. Update these lines:
   ```iss
   #define MyAppVersion "2.1.0"     ← Your version
   AppId={{GENERATE-NEW-GUID}}      ← Click Tools → Generate GUID
   ```

### Step 3: Build Installer

**Option A: Using Inno Setup GUI**
1. Open `installer-setup.iss` in Inno Setup
2. Click **Build → Compile**
3. Find installer in `output/` folder

**Option B: Using Command Line**
```powershell
"C:\Program Files (x86)\Inno Setup 6\ISCC.exe" installer-setup.iss
```

### Output:
✅ `output/CodaiPro-v2.1.0-Setup.exe` (Ready to distribute!)

---

## Method 2: Using NSIS

### Step 1: Install NSIS
- Download: https://nsis.sourceforge.io/Download

### Step 2: Create installer.nsi

```nsis
!include "MUI2.nsh"

!define APP_NAME "CodaiPro"
!define APP_VERSION "2.1.0"
!define APP_PUBLISHER "Lucky Yaduvanshi"
!define APP_WEB_SITE "https://codai.pro"
!define APP_EXE "codai.exe"

Name "${APP_NAME} ${APP_VERSION}"
OutFile "CodaiPro-v${APP_VERSION}-Setup.exe"
InstallDir "$PROGRAMFILES64\CodaiPro"
InstallDirRegKey HKLM "Software\${APP_NAME}" "Install_Dir"
RequestExecutionLevel admin

!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_LICENSE "LICENSE.txt"
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES

!insertmacro MUI_LANGUAGE "English"

Section "MainSection" SEC01
  SetOutPath "$INSTDIR"
  File /r "dist\*.*"
  
  CreateDirectory "$SMPROGRAMS\CodaiPro"
  CreateShortCut "$SMPROGRAMS\CodaiPro\CodaiPro.lnk" "$INSTDIR\${APP_EXE}"
  CreateShortCut "$DESKTOP\CodaiPro.lnk" "$INSTDIR\${APP_EXE}"
  
  WriteRegStr HKLM "Software\${APP_NAME}" "Install_Dir" "$INSTDIR"
  WriteUninstaller "$INSTDIR\Uninstall.exe"
SectionEnd

Section "Uninstall"
  Delete "$INSTDIR\*.*"
  RMDir /r "$INSTDIR"
  Delete "$SMPROGRAMS\CodaiPro\*.*"
  RMDir "$SMPROGRAMS\CodaiPro"
  Delete "$DESKTOP\CodaiPro.lnk"
  DeleteRegKey HKLM "Software\${APP_NAME}"
SectionEnd
```

### Step 3: Build
```powershell
"C:\Program Files (x86)\NSIS\makensis.exe" installer.nsi
```

---

## Building Portable Version

### For Python Applications (PyInstaller)

```bash
# Install PyInstaller
pip install pyinstaller

# Build portable (single file)
pyinstaller --onefile --windowed --icon=icon.ico --name=codai codai.py

# Output: dist/codai.exe
# Rename to: CodaiPro-v2.1-Portable.exe
```

### For Electron Apps

```bash
# Install electron-builder
npm install electron-builder --save-dev

# Build portable
npm run build:portable

# Output in dist/
```

---

## Comparison: Portable vs Installer

| Feature | Portable | Installer Setup |
|---------|----------|----------------|
| **File Count** | 1 file | Multiple files |
| **Installation** | Extract & Run | Wizard install |
| **Desktop Shortcut** | Manual | Automatic |
| **Start Menu** | ❌ No | ✅ Yes |
| **Uninstaller** | ❌ No | ✅ Yes |
| **File Size** | Larger (~2.5 GB) | Smaller (~2 GB) |
| **Auto-Update** | ❌ Manual | ✅ Can integrate |
| **Best For** | 🎒 Students, USB | 🏢 Permanent install |
| **Registry Changes** | ❌ None | ✅ Yes |
| **Admin Rights** | Sometimes | Required |

---

## Testing Your Installer

### Before Release:
1. **Test on Clean Windows:**
   ```
   - Fresh Windows 10 VM
   - Fresh Windows 11 VM
   ```

2. **Test Scenarios:**
   - ✅ Installation to default directory
   - ✅ Installation to custom directory
   - ✅ Desktop shortcut works
   - ✅ Start menu shortcut works
   - ✅ Application launches correctly
   - ✅ Uninstaller works completely
   - ✅ No files left after uninstall

3. **Check File Associations:**
   - Open `.codai` files with CodaiPro
   - Verify icon shows correctly

---

## Creating GitHub Release

### Step 1: Tag Version
```bash
git tag v2.1.0
git push origin v2.1.0
```

### Step 2: Create Release on GitHub
1. Go to: `https://github.com/Luckyyaduvanshiofficial/Codai/releases/new`
2. Choose tag: `v2.1.0`
3. Release title: `CodaiPro v2.1.0 - Enhanced Student Edition`
4. Upload files:
   - `CodaiPro-v2.1-Portable.exe`
   - `CodaiPro-v2.1-Setup.exe`

### Step 3: Release Notes Template
```markdown
## 🎉 CodaiPro v2.1.0 - Enhanced Student Edition

### ✨ New Features
- Feature 1
- Feature 2

### 🐛 Bug Fixes
- Fixed issue #1
- Fixed issue #2

### 📦 Downloads

**Recommended for most users:**
- Windows Installer Setup (Auto-updates, Desktop shortcuts)

**Portable Version:**
- Single executable, no installation required
- Perfect for USB drives or restricted environments

### 📋 System Requirements
- Windows 10/11 (64-bit)
- 4 GB RAM minimum (8 GB recommended)
- 2 GB free disk space

### 🔗 Links
- [Documentation](https://docs.codai.pro)
- [Website](https://codai.pro)
- [GitHub](https://github.com/Luckyyaduvanshiofficial/Codai)

---
**Full Changelog**: https://github.com/Luckyyaduvanshiofficial/Codai/compare/v2.0...v2.1.0
```

---

## Common Issues & Solutions

### Issue 1: "Windows protected your PC" warning

**Solution:**
- Sign your installer with a code signing certificate
- OR: Users click "More info" → "Run anyway"

**Get Code Signing Certificate:**
- SSL.com (~$70/year)
- DigiCert (~$300/year)
- Comodo (~$100/year)

### Issue 2: Antivirus flags installer

**Solution:**
- Submit to VirusTotal
- Whitelist with major antivirus vendors
- Sign your code

### Issue 3: Large file size

**Solution:**
```bash
# Use UPX to compress
upx --best --lzma dist/codai.exe

# Enable compression in Inno Setup
Compression=lzma2/ultra64
SolidCompression=yes
```

---

## Next Steps

1. ✅ Build both versions (Portable + Setup)
2. ✅ Test on clean Windows installations
3. ✅ Create GitHub release
4. ✅ Upload both files
5. ✅ Update website download links
6. ✅ Announce on social media

---

## Resources

- **Inno Setup:** https://jrsoftware.org/isinfo.php
- **NSIS:** https://nsis.sourceforge.io/
- **PyInstaller:** https://pyinstaller.org/
- **Code Signing:** https://www.ssl.com/code-signing/

Need help? Check the docs or open an issue! 🚀
