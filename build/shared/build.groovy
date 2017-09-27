def build_atom(configuration) {
  def fileName = "glo-atom-${configuration}.zip"

  // copy config file from Jenkins
  configFileProvider([configFile(fileId: 'glo-atom-dev-config', variable: 'GLO_ATOM_CONFIG_PATH')]) {
    sh "cat $GLO_ATOM_CONFIG_PATH > config.json"
  }

  // move all necessary files/folder to
  sh 'mkdir zip'
  sh 'mv keymaps zip/keymaps'
  sh 'mv lib zip/lib'
  sh 'mv menus zip/menus'
  sh 'mv styles zip/styles'
  sh 'mv config.json zip/config.json'
  sh 'mv package.json zip/package.json'
  sh 'mv LICENSE.md zip/LICENSE.md'
  sh 'mv README.md zip/README.md'

  // create zip file
  sh "zip -r ${fileName} zip/*"
  // zip dir: "zip", zipFile: "glo-atom-${configuration}.zip", archive: true

  // archive artifact
  archiveArtifacts artifacts: fileName

  return fileName
}

return this
