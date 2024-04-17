import type { EnvPayloadModel, Payload, BlockProps } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {};

const PAYLOAD: Payload = {
   "env": {
      "_$fb": {
         "pages": {
            "main_page": "main_page"
         }
      }
   },
   "flows": {
      "main_flow": [
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "async_eval(6, 1000, (res) => { res({ users: Array.from(xxx(`//*/div[contains(@class, \"hidden sticky\")]//a[contains(@href, \"/?team=\")]//span[1]`)).map(item => ({ label: item.innerText.trim(), value: item.innerText.trim() })) }) })"
         }
      ]
   },
   "config": {
      "ws_endpoint": "",
      "close_browser_on_finish": false,
      "close_browser_on_cancel_request": false,
      "headless": false
   }
};

export const ToolKiwifyGetUsersBlock: BlockProps = {
    title: 'Tool (Kiwify) - Get Users',
    block_id: 'cf62ff0f-9cba-479e-8b12-f709c44bb137',
    description: 'Gets all users within the dev account.',
    tags: ["tool","kiwify","dev"],
    dependencies: ['258e3800-5d46-455f-b20a-2ebb6743cedb'],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}