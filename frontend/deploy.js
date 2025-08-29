// deploy.js - Place this file in your project root
const ghpages = require('gh-pages');
const path = require('path');

console.log('Starting GitHub Pages deployment...');

// Deploy configuration
ghpages.publish(
  'dist', // Source directory (where your built files are)
  {
    branch: 'gh-pages', // Target branch for GitHub Pages
    dotfiles: true, // Include dotfiles in deployment
    message: `Deploy ${new Date().toISOString()}`, // Commit message
    user: {
      name: 'Deploy Bot',
      email: 'deploy@bot.com'
    },
    // This is crucial for GitHub Pages to work correctly
    repo: 'https://github.com/vanedev94/frontend-demobot.git',
    silent: false // Show deployment logs
  },
  (err) => {
    if (err) {
      console.error('❌ Deployment failed:', err);
      process.exit(1);
    } else {
      console.log('✅ Deployment successful!');
      console.log('🌐 Your site will be available at:');
      console.log('   https://vanedev94.github.io/frontend-demobot/');
      console.log('⏰ Note: It may take a few minutes for changes to appear.');
    }
  }
);