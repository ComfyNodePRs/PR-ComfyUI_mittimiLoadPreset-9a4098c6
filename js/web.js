import { ComfyApp, app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";


app.registerExtension({
	name: "ComfyUI_mittimiLoadPreset",

    async nodeCreated(node) {

        if (node.comfyClass == "LoadAndSettingParametersMittimi01") {

            function send_message(node_id, message) {
                const body = new FormData();
                body.append('message',message);
                body.append('node_id', node_id);
                api.fetchApi("/LoadAndSettingParametersMittimi01_path", { method: "POST", body, });
            }

            Object.defineProperty(node.widgets[0], "value", {

                set: (value) => {
                    node._value = value;
                    send_message(node.id, value);
                },
                get: () => {
                            return node._value;
    					 }
    		});


            function messageHandler(event) {

                if (node.id == event.detail.node) {

                    node.widgets[1].value = event.detail.message['PositivePromptA'];
                    node.widgets[2].value = event.detail.message['PositivePromptC'];
                    node.widgets[3].value = event.detail.message['NegativePromptA'];
                    node.widgets[4].value = event.detail.message['NegativePromptC'];
                    node.widgets[5].value = event.detail.message['CheckpointName'];
                    node.widgets[6].value = event.detail.message['ClipSet'];
                    node.widgets[7].value = event.detail.message['VAE'];
                    node.widgets[8].value = event.detail.message['Steps'];
                    node.widgets[9].value = event.detail.message['CFG'];
                    node.widgets[10].value = event.detail.message['SamplerName'];
                    node.widgets[11].value = event.detail.message['Scheduler'];
                }
            }
            api.addEventListener("my.custom.message", messageHandler);
        }


        if (node.comfyClass == "SettingParametersMittimi01") {

            function messageHandler(event) {

                if (node.id == event.detail.node) {

                    node.widgets[0].value = event.detail.message['PositivePromptA'];
                    node.widgets[1].value = event.detail.message['PositivePromptC'];
                    node.widgets[2].value = event.detail.message['NegativePromptA'];
                    node.widgets[3].value = event.detail.message['NegativePromptC'];
                    node.widgets[4].value = event.detail.message['CheckpointName'];
                    node.widgets[5].value = event.detail.message['ClipSet'];
                    node.widgets[6].value = event.detail.message['VAE'];
                    node.widgets[7].value = event.detail.message['Steps'];
                    node.widgets[8].value = event.detail.message['CFG'];
                    node.widgets[9].value = event.detail.message['SamplerName'];
                    node.widgets[10].value = event.detail.message['Scheduler'];
                }
            }
            api.addEventListener("my.custom.message", messageHandler);
        }
    }
});



    