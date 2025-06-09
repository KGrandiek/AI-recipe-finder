import { CopilotChat } from "@copilotkit/react-ui";
import { useCopilotAction } from "@copilotkit/react-core";
 
export default function YourComponent() {

    const customSystemMessage = () => {
        return "Give recipes for ingredients in users fridge to help save thm money and food waste. Ask them what kind of cuisine they like first and then secondly what the season is. after giving them the recipe create image of recipe to show"
    };

    useCopilotAction({
        name: "create-image-of-recipe",
        description: "creates an image of the given recipe",
        parameters: [
          {
            name: "name",
            type: "string",
            description: "Recipe name",
          },
        ],
        handler: async ({ name }) => {
            
            const response = await fetch("/api/generateImage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: name }),
            });
            
            const data = await response.json();
            return data;

        }
      });
 
    return (
        <div className="max-w-[700px] mx-auto">
            <CopilotChat
                labels={{
                    title: "Recipe finder",
                    initial: "Tell me what in your fridge",
                }}
                makeSystemMessage={customSystemMessage} 
            />
        </div>
    );
}