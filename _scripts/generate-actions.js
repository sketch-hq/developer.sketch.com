/**

Script to generate Markdown files for all Sketch actions.

# Usage

  node generate-actions.js

## Update list of actions

The script uses two lists, `actions` and `fakeActions` define below. When 
actions get added, removed or modified in Sketch they need to be updated.

Actions get be extracted in Sketch using the following code snippet in
Plugins › Run Script….

```
// Get all action classes from MSDocument+AllActions and AppController+Actions
// and remove `MS` prefixes and `Action` suffixes.
var actions = []
  .concat(
    context.document.actionClasses().slice(),
    AppController.class().sharedInstance().actionClasses().slice()
  )
  .map((action) =>
    action
      .toString()
      .replace(/^MS/, '')
      .replace(/Action$/, '')
  )
  .sort()

log(JSON.stringify(actions, null, 4))
```

So called fake actions are not defined as action classes and can only be
found by searching for `performFakeActionWithID` within the Sketch codebase
and making sure all identifiers are included in the `fakeAction` variable.

# Output

A Markdown files is generated per action. If a file exists already, it will
be skipped to allow custom documentation.

*/

const fs = require('fs')
const path = require('path')

const actions = [
  'AddAsLibrary',
  'AddBorder',
  'AddExportFormat',
  'AddFill',
  'AddFlow',
  'AddFlowBack',
  'AddFlowHome',
  'AddInnerShadow',
  'AddShadow',
  'AlignBottom',
  'AlignCenter',
  'AlignJustified',
  'AlignLayersBottom',
  'AlignLayersCenter',
  'AlignLayersLeft',
  'AlignLayersMiddle',
  'AlignLayersRight',
  'AlignLayersTop',
  'AlignLeft',
  'AlignMiddle',
  'AlignRight',
  'AlignTop',
  'AlignmentActions',
  'ApplyData',
  'ApplyHorizontalFlip',
  'ApplyLandscapeOrientation',
  'ApplyPortraitOrientation',
  'ApplySharedLayerStyle',
  'ApplySharedTextStyle',
  'ApplyVerticalFlip',
  'AssignColorSpace',
  'Assistant',
  'AssistantActivate',
  'AssistantCheckDocument',
  'AssistantCheckDocumentAutomatically',
  'AssistantConfigure',
  'AssistantInstallFromDisk',
  'AssistantInstallFromURL',
  'AssistantInstallMissing',
  'AssistantShowIgnored',
  'AutoExpandGroups',
  'BackToInstance',
  'BadgeMenu',
  'BadgeMenu',
  'BaseAlignLayers',
  'BaseStyle',
  'BooleanActionGroup',
  'BooleanMenu',
  'CenterLayersInCanvas',
  'CenterSelectionInVisibleArea',
  'ChangeFlowAnimationFromBottomAnimation',
  'ChangeFlowAnimationFromLeftAnimation',
  'ChangeFlowAnimationFromRightAnimation',
  'ChangeFlowAnimationFromTopAnimation',
  'ChangeFlowAnimationNoAnimation',
  'ChangeFont',
  'ChangeInferredLayout',
  'ClearDataRecord',
  'ClippingMask',
  'ClippingMaskMode',
  'ClosePath',
  'Cloud',
  'CollapseAllGroups',
  'ColorInspectorCircularGradientTab',
  'ColorInspectorColorTab',
  'ColorInspectorImageTab',
  'ColorInspectorLinearGradientTab',
  'ColorInspectorModeBorderTouchBarGroup',
  'ColorInspectorModeFillTouchBarGroup',
  'ColorInspectorModePicker',
  'ColorInspectorRadialGradientTab',
  'ConstraintFixHeight',
  'ConstraintFixWidth',
  'ConstraintPinBottom',
  'ConstraintPinLeft',
  'ConstraintPinRight',
  'ConstraintPinTop',
  'ConstraintReset',
  'ContextMenuData',
  'ConvertColorSpace',
  'ConvertFlowToHotspot',
  'ConvertSymbolOrDetachInstances',
  'ConvertSymbolOrDetachInstancesRecursively',
  'ConvertToOutlines',
  'Copy',
  'CopyCSSAttributes',
  'CopyCloudDocumentLink',
  'CopyOverride',
  'CopySVGCode',
  'CopyStyle',
  'CreateSharedColor',
  'CreateSharedStyle',
  'CreateSymbol',
  'CurveModeAsymmetric',
  'CurveModeDisconnected',
  'CurveModeMirrored',
  'CurveModeStraight',
  'CurveModeTouchGroup',
  'Cut',
  'DataMenu',
  'DefaultStyle',
  'Delete',
  'DetachSharedColor',
  'DetachSharedStyle',
  'Difference',
  'DistributeActions',
  'DistributeHorizontally',
  'DistributeVertically',
  'Duplicate',
  'Edit',
  'EditColorSpace',
  'Export',
  'ExportPDFBook',
  'ExportSelectionWithExportFormats',
  'Find',
  'Flatten',
  'FlattenSelection',
  'FlipHorizontal',
  'FlipVertical',
  'FollowFlow',
  'ForceResyncLibrary',
  'GridSettings',
  'Group',
  'GroupActionGroup',
  'HideAllGridsAndLayouts',
  'HideLayer',
  'IgnoreClippingMask',
  'ImageOriginalSize',
  'IncompatiblePluginsDisabled',
  'InsertArrow',
  'InsertArtboard',
  'InsertHotspot',
  'InsertImage',
  'InsertLine',
  'InsertMenu',
  'InsertSharedText',
  'InsertSlice',
  'InsertSymbol',
  'InsertTextLayer',
  'InsertVector',
  'Intersect',
  'Join',
  'LayerFocusActions',
  'LayerHeightFocus',
  'LayerWidthFocus',
  'LayerXFocus',
  'LayerYFocus',
  'LayoutSettings',
  'LegacyInsertMenu',
  'LicenseExpired',
  'ListTypeActionBullet',
  'ListTypeActionNone',
  'ListTypeActionNumbered',
  'LockLayer',
  'Magnifier',
  'MainMenuData',
  'MakeGrid',
  'MakeLowercase',
  'MakeUppercase',
  'ManageCloudDocumentShareSettings',
  'MaskWithShape',
  'Mirror',
  'MoveActionGroup',
  'MoveBackward',
  'MoveForward',
  'MoveToBack',
  'MoveToFront',
  'MoveToTop',
  'MoveUpHierarchy',
  'NavigateToOverrideMaster',
  'NewPage',
  'NextPage',
  'OffsetPath',
  'OpenPreview',
  'OpenStyleInLibrary',
  'OpenSwatchInLibrary',
  'OpenSymbolInLibrary',
  'OpenTypeFeatures',
  'OrganizeImportedSymbols',
  'OvalShape',
  'Paste',
  'PasteHere',
  'PasteOverSelection',
  'PasteStyle',
  'PasteWithStyle',
  'Pencil',
  'PolygonShape',
  'PreviewAtActualSize',
  'PreviousPage',
  'Print',
  'RectangleShape',
  'Redo',
  'ReduceFileSize',
  'ReduceImageSize',
  'RefreshData',
  'RemoveAllOverrides',
  'RemoveFlow',
  'RemoveSelectedOverrides',
  'RemoveTextTransform',
  'RemoveUnusedStyles',
  'RenameLayer',
  'ReplaceColor',
  'ReplaceFonts',
  'ReplaceImage',
  'ReplaceOverride',
  'ReplaceOverrideStyle',
  'ReplaceOverrideSymbol',
  'ReplaceWithSymbol',
  'ReplaceWithSymbolRoot',
  'ResetOrigin',
  'ResetSharedColor',
  'ResetSharedStyle',
  'ResetSymbolSize',
  'ResizeArtboardToFit',
  'RevealInLayerList',
  'ReversePath',
  'Rotate',
  'RotateClockwise',
  'RotateCounterclockwise',
  'RoundToPixel',
  'RoundedRectangleShape',
  'SaveAsTemplate',
  'Scale',
  'Scissors',
  'Search',
  'SelectAll',
  'SelectAllArtboards',
  'SendToSymbolsPage',
  'Shape',
  'ShowBorderOptions',
  'ShowColors',
  'ShowComponentsPane',
  'ShowComponentsPane',
  'ShowDocumentFonts',
  'ShowFillOptions',
  'ShowFonts',
  'ShowLayerList',
  'ShowLayerList',
  'ShowReplaceColorSheet',
  'Sketch.MSAddComponent',
  'Sketch.MSChangeComponentKindActionGroup',
  'Sketch.MSChangeLayerStyleComponentKind',
  'Sketch.MSChangeSwatchComponentKind',
  'Sketch.MSChangeSymbolComponentKind',
  'Sketch.MSChangeTextStyleComponentKind',
  'Sketch.MSComponentsPicker',
  'Sketch.MSContentMode',
  'Sketch.MSCopyComponent',
  'Sketch.MSDeleteComponent',
  'Sketch.MSDuplicateComponent',
  'Sketch.MSEditSymbolMasterComponent',
  'Sketch.MSFilterComponentList',
  'Sketch.MSGroupComponents',
  'Sketch.MSInsertComponentInstance',
  'Sketch.MSMaintainScrollPosition',
  'Sketch.MSRenameComponent',
  'Sketch.MSRenameSharedStyle',
  'Sketch.MSRevealComponent',
  'Sketch.MSRevealComponentsPanel',
  'Sketch.MSTidy',
  'Sketch.MSUngroupComponents',
  'Sketch.MSVisitSymbolComponent',
  'Sketch.ToggleLibraryListInComponentsPanel',
  'SmartRotate',
  'StarShape',
  'Subtract',
  'SyncLibrary',
  'SyncLocalColor',
  'SyncLocalStyle',
  'TextAlignTouchBarGroup',
  'TextOnPath',
  'TextStyleTouchBar',
  'ToggleAlignmentGuides',
  'ToggleArtboardShadow',
  'ToggleBorder',
  'ToggleFill',
  'ToggleFixToViewport',
  'ToggleFlowInteraction',
  'ToggleGrid',
  'ToggleInspectorVisibility',
  'ToggleInterface',
  'ToggleLayerHighlight',
  'ToggleLayout',
  'TogglePixelGrid',
  'TogglePixelLines',
  'ToggleRulerDragLocking',
  'ToggleRulers',
  'ToggleSelection',
  'ToggleSidebarVisibility',
  'ToggleSliceInteraction',
  'ToggleToolbarVisibility',
  'ToolsMenu',
  'Transform',
  'TriangleShape',
  'Underline',
  'Undo',
  'Ungroup',
  'Union',
  'UnlinkAndSyncFromLibrary',
  'UnlinkFromLibrary',
  'UpdatePlugins',
  'ViewDocumentInDocumentsWindow',
  'ViewMenu',
  'ViewOnSketchCloudWeb',
  'Zoom',
  'ZoomActions',
  'ZoomIn',
  'ZoomOut',
  'ZoomToActualSize',
  'ZoomToArtboard',
  'ZoomToSelection',
]

const fakeActions = [
  'HandleURL',
  'RunPluginCommand',
  'HandlerGotFocus',
  'HandlerLostFocus',
  'LayersMoved',
  'LayersResized',
  'TextChanged',
  'OpenDocument',
  'CloseDocument',
  'ExportSlices',
  'SelectionChanged',
  'ArtboardChanged',
  'DocumentSaved',
]

const specialActions = ['Startup', 'Shutdown']

const allActions = actions.concat(fakeActions).concat(specialActions)

const actionsPath = path.join(__dirname, '../_actions')

if (!fs.existsSync(actionsPath)) {
  fs.mkdirSync(actionsPath)
}

allActions.forEach((action) => {
  const actionPath = path.join(actionsPath, `${action}.md`)
  if (fs.existsSync(actionPath)) {
    return
  }
  fs.writeFileSync(
    actionPath,
    `---
title: ${action}
summary:
---

No details available for \`${action}\`.
`,
    'utf8',
  )
  console.log(`Generated file for ${action}`)
})
