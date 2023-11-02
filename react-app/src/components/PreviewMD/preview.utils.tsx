import { ICommand } from '@uiw/react-markdown-editor'

import { Chip } from '@mui/joy'
import { Commands } from '@uiw/react-markdown-editor/cjs/components/ToolBar'

const TOOLBAR_ACTION = {
  COLLAPSIBLE: {
    NAME: 'COLLAPSIBLE',
    ICON: (
      <svg width="12" height="12" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="16" id="icon-bound" fill="none" />
        <path
          fill="currentColor"
          d="M4.414,15.414L8,11.828L11.586,15.414L13,14L8,9L3,14L4.414,15.414ZM11.586,0.586L8,4.172L4.414,0.586L3,2L8,7L13,2L11.586,0.586Z"
        />
      </svg>
    ),
    CMD: `
<details>
<summary>Demo</summary>
  
  
</details>`,
  },
}
const TOOLBAR_BUTTON = {
  ISSUE_TYPE: 'ISSUE_TYPE',
  REPO_ORG: 'REPO_ORG',
  REPO_NAME: 'REPO_NAME',
  ISSUE: 'ISSUE',
  SIGNATURE: 'SIGNATURE',
}

const hotkeyToolbar = (name: string) => {
  const toolbar: ICommand = {
    name,
    keyCommand: name,
    icon: (
      <div>
        <Chip size="sm" color="primary" variant="solid">
          {name}
        </Chip>
      </div>
    ),
    execute: ({ state, view }: any): void => {
      if (!state || !view) return

      const lineInfo = view.state.doc.lineAt(view.state.selection.main.from)
      let mark = name
      const regex = new RegExp(`^${name}+`)
      const matchMark = lineInfo.text.match(regex)
      if (matchMark && matchMark[0]) {
        const txt = matchMark[0]
        if (txt.length < 6) {
          mark = txt + name
        }
      }

      if (mark.length > 6) {
        mark = name
      }
      const title = lineInfo.text.replace(regex, '')
      view.dispatch({
        changes: {
          from: lineInfo.from,
          to: lineInfo.to,
          insert: `${title} ${mark}`.trim(),
        },
        selection: { anchor: lineInfo.from + mark.length },
      })
    },
  }

  return toolbar
}

const customAction = (ACTION: { NAME: string; ICON: JSX.Element; CMD: string }) => {
  const toolbar: ICommand = {
    name: ACTION.NAME,
    keyCommand: ACTION.NAME,
    icon: ACTION.ICON,
    execute: ({ state, view }: any): void => {
      if (!state || !view) return

      const lineInfo = view.state.doc.lineAt(view.state.selection.main.from)
      let mark = ACTION.CMD
      const regex = new RegExp(`^${ACTION.CMD}+`)
      const matchMark = lineInfo.text.match(regex)
      if (matchMark && matchMark[0]) {
        const txt = matchMark[0]
        if (txt.length < 6) {
          mark = txt + ACTION.CMD
        }
      }

      if (mark.length > 6) {
        mark = ACTION.CMD
      }
      const title = lineInfo.text.replace(regex, '')
      view.dispatch({
        changes: {
          from: lineInfo.from,
          to: lineInfo.to,
          insert: `${title}${mark}`,
        },
        selection: { anchor: lineInfo.from + mark.length },
      })
    },
  }

  return toolbar
}
const toolbars: Commands[] = [
  'undo',
  'redo',
  'bold',
  'italic',
  'header',
  'strike',
  'underline',
  'quote',
  'olist',
  'ulist',
  'todo',
  'link',
  'image',
  'code',
  'codeBlock',
  customAction(TOOLBAR_ACTION.COLLAPSIBLE),
  hotkeyToolbar(TOOLBAR_BUTTON.ISSUE_TYPE),
  hotkeyToolbar(TOOLBAR_BUTTON.REPO_ORG),
  hotkeyToolbar(TOOLBAR_BUTTON.REPO_NAME),
  hotkeyToolbar(TOOLBAR_BUTTON.ISSUE),
  hotkeyToolbar(TOOLBAR_BUTTON.SIGNATURE),
]

export { toolbars }
