def build_shared_ui(configuration) {
  // pull shared UI
  sshagent (credentials: ['axosoft-build']) {
    // install depencencies
    sh "git clone git@github.com:Axosoft/tasks-ui.git"
  
    dir ('tasks-ui') {
      sh 'yarn'

      // HACK: build shared styles
      dir("./node_modules/gitkraken-shared-styles") {
        sh 'yarn build'
      }

      // copy the config.json for tasks-ui package before building it
      sh "cp ./build/${configuration}/config.json config.json"

      // build shared UI
      sh 'yarn build'
    }
  }
}

def build_atom(configuration) {
  def fileName = "glo-atom-${configuration}.zip"

  sh 'cp tasks-ui/dist/TasksUI.js lib/TasksUI.js'
  sh 'cp -a tasks-ui/node_modules/gitkraken-shared-styles/icons lib/icons'

  // move all necessary files/folder to 
  sh 'mkdir zip'
  sh 'mv keymaps zip/keymaps'
  sh 'mv lib zip/lib'
  sh 'mv menus zip/menus'
  sh 'mv styles zip/styles'
  sh 'mv package.json zip/package.json'
  sh 'mv LICENSE.md zip/LICENSE.md'
  sh 'mv README.md zip/README.md'

  // create zip file
  sh "zip -r ${fileName} zip"
  // zip dir: "zip", zipFile: "glo-atom-${configuration}.zip", archive: true

  // archive artifact
  archiveArtifacts artifacts: fileName

  return fileName
}

return this