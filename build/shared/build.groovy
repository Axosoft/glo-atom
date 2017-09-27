def build_atom(configuration) {
  def fileName = "glo-atom-${configuration}.zip"

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
  sh "zip -r ${fileName} zip/*"
  // zip dir: "zip", zipFile: "glo-atom-${configuration}.zip", archive: true

  // archive artifact
  archiveArtifacts artifacts: fileName

  return fileName
}

return this
