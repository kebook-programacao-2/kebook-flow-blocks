import type { EnvPayloadModel, Payload } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "icons": {
      "template_schema": {
         "icon_name": "",
         "icon_url": ""
      },
      "schema": {
         "label": "Icons",
         "tooltip": "Icons tooltip",
         "fields_type": "array",
         "fields": {
            "icon_name": {
               "schema": {
                  "label": "Icon_name",
                  "tooltip": "Icon_name tooltip",
                  "placeholder": "Icon_name placeholder",
                  "type": "text"
               }
            },
            "icon_url": {
               "schema": {
                  "label": "Icon_url",
                  "tooltip": "Icon_url tooltip",
                  "placeholder": "Icon_url placeholder",
                  "type": "text"
               }
            }
         }
      },
      "value": []
   }
};

const PAYLOAD: Payload = {
   "env": {
      "_pages": {
         "main_page": "main_page"
      },
      "icons": [
         {
            "icon_name": "activity-heartbeat",
            "icon_url": "https://tabler.io/icons/icon/activity-heartbeat"
         },
         {
            "icon_name": "address-book",
            "icon_url": "https://tabler.io/icons/icon/address-book"
         },
         {
            "icon_name": "ad",
            "icon_url": "https://tabler.io/icons/icon/ad"
         }
      ]
   },
   "flows": {
      "main_flow": [
         {
            "command": "run_flow_for_each",
            "enabled": true,
            "flow": "extract_icon",
            "env_var": "%icons%"
         }
      ],
      "extract_icon": [
         {
            "command": "goto",
            "enabled": true,
            "target": "%icon_url%"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ '%icon_name%': x('//a[@data-title=\"Copy React name\"]').innerText })"
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

export const TablerIconsScraperBlock = {
    title: 'Tabler Icons Scraper',
    block_id: 'e3314016-6042-4854-8a33-1e2d9b22b494',
    description: 'Scrapes Tabler Icons.',
    tags: ['dev'],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}