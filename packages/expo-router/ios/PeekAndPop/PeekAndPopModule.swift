import ExpoModulesCore

public class PeekAndPopModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoRouterPeekAndPop")

    View(PeekAndPopView.self) {
      Prop("nextScreenId") { (view: PeekAndPopView, nextScreenId: String) in
        view.setNextScreenId(nextScreenId)
      }

      Prop("actions") { (view: PeekAndPopView, actions: [[String: String]]) in
        view.setActions(actions)
      }

      Prop("preferredContentSize") { (view: PeekAndPopView, size: [String: Int]) in
        view.setPreferredContentSize(size)
      }

      Events(
        "onPreviewTapped",
        "onWillPreviewOpen",
        "onDidPreviewOpen",
        "onPreviewWillClose",
        "onPreviewDidClose",
        "onActionSelected"
      )
    }

    View(PeekAndPopPreviewView.self) {
      Events("onSetSize")
    }

    View(PeekAndPopTriggerView.self) {}
  }
}
