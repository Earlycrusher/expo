import ExpoModulesCore

class PeekAndPopView: ExpoView, UIContextMenuInteractionDelegate {
  private var trigger: PeekAndPopTriggerView?
  private var preview: PeekAndPopPreviewView?
  private var interaction: UIContextMenuInteraction?
  private var nextScreenId: String?
  private var actions: [[String: String]] = []
  private var preferredContentSize: CGSize = .zero

  private let peekAndPopNavigation: PeekAndPopNavigation = PeekAndPopNavigation()

  let onPreviewTapped = EventDispatcher()
  let onWillPreviewOpen = EventDispatcher()
  let onDidPreviewOpen = EventDispatcher()
  let onPreviewWillClose = EventDispatcher()
  let onPreviewDidClose = EventDispatcher()
  let onActionSelected = EventDispatcher()

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    self.interaction = UIContextMenuInteraction(delegate: self)
  }

  // MARK: - Props

  func setNextScreenId(_ screenId: String) {
    self.nextScreenId = screenId
    peekAndPopNavigation.updatePreloadedView(screenId, with: self)
  }

  func setActions(_ actions: [[String: String]]) {
    self.actions = actions
  }

  func setPreferredContentSize(_ size: [String: Int]) {
    let width = size["width"] ?? Int(UIScreen.main.bounds.width)
    let height = size["height"] ?? Int(UIScreen.main.bounds.height)
    if width < 0 || height < 0 {
      print("Preferred content size cannot be negative (\(width), \(height))")
      return
    }
    self.preferredContentSize = CGSize(width: max(width, 0), height: max(height, 0))
  }

  // MARK: - Children

  override func mountChildComponentView(_ childComponentView: UIView, index: Int) {
    if let triggerView = childComponentView as? PeekAndPopTriggerView {
      trigger = triggerView
      if let interaction = self.interaction, self.preview != nil {
        trigger?.addInteraction(interaction)
      }
      super.mountChildComponentView(childComponentView, index: index)
    } else if let previewView = childComponentView as? PeekAndPopPreviewView {
      preview = previewView
      if let interaction = self.interaction, let trigger = self.trigger {
        trigger.addInteraction(interaction)
      }
    } else {
      print(
        "ExpoRouter: Unknown child component view (\(childComponentView)) mounted to PeekAndPopView"
      )
    }
  }

  override func unmountChildComponentView(_ child: UIView, index: Int) {
    if child is PeekAndPopTriggerView {
      if let interaction = self.interaction {
        trigger?.removeInteraction(interaction)
      }
      trigger = nil
      super.unmountChildComponentView(child, index: index)
    } else if child is PeekAndPopPreviewView {
      preview = nil
      if let interaction = self.interaction {
        trigger?.removeInteraction(interaction)
      }
    } else {
      print(
        "ExpoRouter: Unknown child component view (\(child)) unmounted from PeekAndPopView")
    }
  }

  // MARK: - UIContextMenuInteractionDelegate

  func contextMenuInteraction(
    _ interaction: UIContextMenuInteraction,
    configurationForMenuAtLocation location: CGPoint
  ) -> UIContextMenuConfiguration? {
    onWillPreviewOpen()
    return UIContextMenuConfiguration(
      identifier: nil,
      previewProvider: { [weak self] in
        self?.createPreviewViewController()
      },
      actionProvider: { [weak self] _ in
        self?.createContextMenu()
      })
  }

  func contextMenuInteraction(
    _ interaction: UIContextMenuInteraction,
    configuration: UIContextMenuConfiguration,
    highlightPreviewForItemWithIdentifier identifier: any NSCopying
  ) -> UITargetedPreview? {
    if let trigger = self.trigger {
      let target = UIPreviewTarget(container: self, center: trigger.center)

      let parameters = UIPreviewParameters()
      parameters.backgroundColor = .clear
      parameters.shadowPath = UIBezierPath(roundedRect: trigger.bounds, cornerRadius: 10)

      return UITargetedPreview(view: trigger, parameters: parameters, target: target)
    }
    return nil
  }

  func contextMenuInteraction(
    _ interaction: UIContextMenuInteraction,
    willDisplayMenuFor configuration: UIContextMenuConfiguration,
    animator: UIContextMenuInteractionAnimating?
  ) {
    animator?.addCompletion {
      self.onDidPreviewOpen()
    }
  }

  func contextMenuInteraction(
    _ interaction: UIContextMenuInteraction,
    willEndFor configuration: UIContextMenuConfiguration,
    animator: UIContextMenuInteractionAnimating?
  ) {
    onPreviewWillClose()
    animator?.addCompletion {
      self.onPreviewDidClose()
    }
  }

  func contextMenuInteraction(
    _ interaction: UIContextMenuInteraction,
    willPerformPreviewActionForMenuWith configuration: UIContextMenuConfiguration,
    animator: UIContextMenuInteractionCommitAnimating
  ) {
    peekAndPopNavigation.pushPreloadedView()
    animator.addCompletion { [weak self] in
      self?.onPreviewTapped()
    }
  }

  // MARK: - Context Menu Helpers

  private func createPreviewViewController() -> UIViewController {
    guard let preview = preview else {
      return UIViewController()
    }

    let vc = PreviewViewController(peekAndPopPreview: preview)
    vc.view.addSubview(preview)
    vc.preferredContentSize = self.preferredContentSize
    return vc
  }

  private func createContextMenu() -> UIMenu {
    let uiActions = actions.filter {
      // Making sure that only actions with non-empty id and title are displayed
      ($0["id"]?.isEmpty == false && $0["title"]?.isEmpty == false)
    }
    .map { action in
      return UIAction(
        title: action["title"] ?? ""
      ) { _ in
        self.onActionSelected([
          "id": action["id"] ?? ""
        ])
      }
    }

    return UIMenu(title: "", children: uiActions)
  }
}

class PreviewViewController: UIViewController {
  private let peekAndPopPreview: PeekAndPopPreviewView
  init(peekAndPopPreview: PeekAndPopPreviewView) {
    self.peekAndPopPreview = peekAndPopPreview
    super.init(nibName: nil, bundle: nil)
  }

  @available(*, unavailable)
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  // TODO: Consider using setViewSize from ExpoFabricView
  override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)
    peekAndPopPreview.setInitialSize(bounds: self.view.bounds)
  }
}
