```bash
#!/bin/bash
# Fix VS Code Git integration for portfolio-sazid

REPO_DIR="$HOME/Documents/GitHub/portfolio-sazid"
VSCODE_SETTINGS="$REPO_DIR/.vscode/settings.json"

# Step 1: Ensure valid workspace settings.json
echo "Checking workspace settings.json..."
if [ -f "$VSCODE_SETTINGS" ]; then
  echo "Backing up existing settings.json..."
  mv "$VSCODE_SETTINGS" "$VSCODE_SETTINGS.bak"
fi
mkdir -p "$(dirname "$VSCODE_SETTINGS")"
echo "{\"git.enabled\": true, \"git.path\": \"C:\\\\Program Files\\\\Git\\\\cmd\\\\git.exe\"}" > "$VSCODE_SETTINGS"
echo "Created new workspace settings.json"

# Step 2: Ignore settings.json if not tracked
cd "$REPO_DIR"
if ! git ls-files | grep -q ".vscode/settings.json"; then
  echo "Adding .vscode/settings.json to .gitignore..."
  echo ".vscode/settings.json" >> .gitignore
  git add .gitignore
  git commit -m "Ignore workspace settings" || echo "No changes to commit"
fi

# Step 3: Clear Git cache
echo "Refreshing Git cache..."
git rm -r --cached .
git add .
git commit -m "Refresh Git cache" || echo "No changes to commit"

# Step 4: Verify SSH setup
echo "Verifying SSH setup for RageSpider..."
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
ssh -T git@github.com

# Step 5: Optimize repository
echo "Optimizing repository..."
git gc --aggressive

# Step 6: Push changes
echo "Pushing changes..."
git push -u origin main

# Step 7: Open VS Code
echo "Opening VS Code to verify..."
code "$REPO_DIR"

echo "Done! Test Git operations in VS Code's Source Control panel."
```