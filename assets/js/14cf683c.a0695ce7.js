"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1579],{5372:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>r,contentTitle:()=>c,default:()=>d,frontMatter:()=>s,metadata:()=>o,toc:()=>l});var i=n(4848),t=n(8453);const s={title:"GitHub Actions",sidebar_position:9},c=void 0,o={id:"cookbooks/introduction/gh-action",title:"GitHub Actions",description:"Preparing simple application",source:"@site/docs/cookbooks/introduction/gh-action.md",sourceDirName:"cookbooks/introduction",slug:"/cookbooks/introduction/gh-action",permalink:"/docs/cookbooks/introduction/gh-action",draft:!1,unlisted:!1,editUrl:"https://github.com/Virtuslab/scala-cli/edit/main/website/docs/cookbooks/introduction/gh-action.md",tags:[],version:"current",sidebarPosition:9,frontMatter:{title:"GitHub Actions",sidebar_position:9},sidebar:"tutorialSidebar",previous:{title:"GitHub gists",permalink:"/docs/cookbooks/introduction/gists"},next:{title:"VSCode setup",permalink:"/docs/cookbooks/ide/vscode"}},r={},l=[{value:"Preparing simple application",id:"preparing-simple-application",level:2},{value:"Run tests in Github CI",id:"run-tests-in-github-ci",level:2},{value:"Check your Scala code format",id:"check-your-scala-code-format",level:2},{value:"Package your application",id:"package-your-application",level:2},{value:"Distribute generated native application",id:"distribute-generated-native-application",level:2}];function p(e){const a={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.h2,{id:"preparing-simple-application",children:"Preparing simple application"}),"\n",(0,i.jsxs)(a.p,{children:["Scala CLI lets you run, test, and package Scala code in various environments, including GitHub CI.\nTo use Scala CLI features in a simple way you can use the GitHub Actions ",(0,i.jsx)(a.a,{href:"https://github.com/VirtusLab/scala-cli-setup",children:"scala-cli-setup"})," that installs everything necessary to run your Scala CLI application and more."]}),"\n",(0,i.jsxs)(a.p,{children:["For example, here's a simple ",(0,i.jsx)(a.code,{children:"ls"})," application printing the files in a given directory:"]}),"\n",(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-scala",metastring:"title=Ls.scala",children:'//> using scala 2.13\n//> using dep com.lihaoyi::os-lib:0.7.8\n\n@main def hello(args: String*) =\n  val path = args.headOption match\n    case Some(p) => os.Path(p, os.pwd)\n    case _       => os.pwd\n\n  if (os.isDir(path)) println(os.list(path).mkString(","))\n  else System.err.println("Expected directory path as an input")\n'})}),"\n",(0,i.jsxs)(a.p,{children:["and some tests for ",(0,i.jsx)(a.code,{children:"ls"})," application:"]}),"\n",(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-scala",metastring:"title=TestsLs.test.scala",children:'//> using dep org.scalameta::munit::0.7.27\nimport scala.util.Properties\n\nclass TestsLs extends munit.FunSuite {\n  test("ls") {\n    // prepare test directory\n    val tempDir = os.temp.dir()\n    // create files\n    val expectedFiles = Seq("Ls", "Hello").map(tempDir / _)\n    expectedFiles.foreach(os.write(_, "Hello"))\n\n    // check\n    val scalaCLILauncher = if(Properties.isWin) "scala-cli.bat" else "scala-cli"\n    val foundFiles =\n      os.proc(scalaCLILauncher, "Ls.scala", "--", tempDir).call().out.trim()\n\n    expectedFiles.map(_.toString).foreach { file =>\n      assert(foundFiles.contains(file))\n    }\n  }\n}\n\n'})}),"\n",(0,i.jsx)(a.h2,{id:"run-tests-in-github-ci",children:"Run tests in Github CI"}),"\n",(0,i.jsxs)(a.p,{children:["The following configuration of ",(0,i.jsx)(a.code,{children:"ci.yml"})," contains a definition of job that runs tests using Scala CLI for every platform defined in ",(0,i.jsx)(a.code,{children:"matrix.OS"}),"."]}),"\n",(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-yaml",children:'jobs:\n  build:\n    runs-on: ${{ matrix.OS }}\n    strategy:\n      matrix:\n        OS: ["ubuntu-latest", "macos-latest", "windows-latest"]\n    steps:\n    - uses: actions/checkout@v3\n      with:\n        fetch-depth: 0\n    - uses: coursier/cache-action@v6.3\n    - uses: VirtusLab/scala-cli-setup@v0.1\n    - run: scala-cli test .\n'})}),"\n",(0,i.jsx)(a.h2,{id:"check-your-scala-code-format",children:"Check your Scala code format"}),"\n",(0,i.jsxs)(a.p,{children:["To check the code style of your sources, you can use ",(0,i.jsx)(a.a,{href:"https://scalameta.org/scalafmt/",children:"Scalafmt"}),"."]}),"\n",(0,i.jsxs)(a.p,{children:["To check your code format in GitHub CI by adding new job ",(0,i.jsx)(a.code,{children:"format"}),":"]}),"\n",(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-yaml",children:'  format:\n    runs-on: "ubuntu-latest"\n    steps:\n    - uses: actions/checkout@v3\n      with:\n        fetch-depth: 0\n    - uses: coursier/cache-action@v6.3\n    - uses: VirtusLab/scala-cli-setup@v0.1\n    - name: Scalafmt check\n      run: |\n        scala-cli fmt --check . || (\n          echo "To format code run"\n          echo "  scala-cli fmt ."\n          exit 1\n        )\n'})}),"\n",(0,i.jsxs)(a.p,{children:["If the ",(0,i.jsx)(a.code,{children:"scala-cli fmt --check ."})," command fails, it can be easily fixed by running ",(0,i.jsx)(a.code,{children:"scala-cli fmt ."}),", which correctly formats your code."]}),"\n",(0,i.jsx)(a.h2,{id:"package-your-application",children:"Package your application"}),"\n",(0,i.jsxs)(a.p,{children:["Scala CLI allows to build native executable applications using ",(0,i.jsx)(a.a,{href:"https://www.graalvm.org",children:"GraalVM"}),", which can be uploaded as GitHub release artifacts."]}),"\n",(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-yaml",children:"    - name: Package app\n      run: scala-cli .github/scripts/package.sc\n"})}),"\n",(0,i.jsxs)(a.p,{children:["Given this simple Scala Script ",(0,i.jsx)(a.code,{children:"package.sc"})," to package application to every platform:"]}),"\n",(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-scala",metastring:"title=package.sc",children:'//> using scala 3.1.2\n//> using dep com.lihaoyi::os-lib:0.8.0\nimport scala.util.Properties\n\nval platformSuffix: String = {\n  val os =\n    if (Properties.isWin) "pc-win32"\n    else if (Properties.isLinux) "pc-linux"\n    else if (Properties.isMac) "apple-darwin"\n    else sys.error(s"Unrecognized OS: ${sys.props("os.name")}")\n  os\n}\nval artifactsPath = os.Path("artifacts", os.pwd)\nval destPath =\n  if (Properties.isWin) artifactsPath / s"ls-$platformSuffix.exe"\n  else artifactsPath / s"ls-$platformSuffix"\nval scalaCLILauncher =\n  if (Properties.isWin) "scala-cli.bat" else "scala-cli"\n\nos.makeDir(artifactsPath)\nos.proc(scalaCLILauncher,"--power",  "package", ".", "-o", destPath, "--native-image")\n  .call(cwd = os.pwd)\n  .out\n  .text()\n  .trim\n'})}),"\n",(0,i.jsx)(a.h2,{id:"distribute-generated-native-application",children:"Distribute generated native application"}),"\n",(0,i.jsxs)(a.p,{children:["To upload generated native executable applications to artifacts you can use ",(0,i.jsx)(a.a,{href:"https://github.com/actions/upload-artifact",children:"upload-artifact"})," GitHub Actions."]}),"\n",(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-yaml",children:"    - uses: actions/upload-artifact@v3\n      with:\n        name: launchers\n        path: artifacts\n        if-no-files-found: error\n        retention-days: 2\n"})}),"\n",(0,i.jsx)(a.p,{children:"When release CI pass, you should be able to download artifacts that contain native launchers of your applications."}),"\n",(0,i.jsxs)(a.p,{children:[(0,i.jsx)(a.a,{href:"https://github.com/lwronski/ls-scala-cli-demo/actions/runs/2376334882",children:"Here"})," you can find examples of a CI that contains generated launcher based on this cookbook."]}),"\n",(0,i.jsxs)(a.p,{children:["You can find the code of this cookbook ",(0,i.jsx)(a.a,{href:"https://github.com/lwronski/ls-scala-cli-demo",children:"here"}),"."]})]})}function d(e={}){const{wrapper:a}={...(0,t.R)(),...e.components};return a?(0,i.jsx)(a,{...e,children:(0,i.jsx)(p,{...e})}):p(e)}},8453:(e,a,n)=>{n.d(a,{R:()=>c,x:()=>o});var i=n(6540);const t={},s=i.createContext(t);function c(e){const a=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function o(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),i.createElement(s.Provider,{value:a},e.children)}}}]);