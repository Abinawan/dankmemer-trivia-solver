const { EmbedAssertions } = require('@discordjs/builders');
const { Client, GatewayIntentBits, EmbedBuilder, Message  } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const  googleIt = require('google-it') // node i google-it
client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', async (message) => {
if(message.interaction){
  if(message.interaction.commandName.toLocaleLowerCase() === "trivia"){
    // keeping all 4 option in var
    op1 = message.components[0].components[0].label;
    op2 = message.components[0].components[1].label;
    op3 = message.components[0].components[2].label;
    op4 = message.components[0].components[3].label;
    
    text = message.embeds[0].description;
    subsval = text.lastIndexOf("You have");
    subsval = subsval - 4;
    triviaquestion = text.substring(2, subsval); // question of the trivia
    const questionembed = new EmbedBuilder()
    .setDescription(`**Q. ${triviaquestion}**`)
    .setTitle("Couldn't find the answer, check your luck! :wink: ")
    .setFooter({text: "NOTE: Sometimes the option maybe incorrect."})
    
      const item = await googleIt({'query': `${triviaquestion}`}) // googles the question
      let a = 0;
      let i = 0;
      while(!a >= 1){ // checking for answers in google
        searchedtext = item[i].snippet.toLocaleLowerCase();
        if(searchedtext.search(op1.toLocaleLowerCase()) >= 0){
          questionembed.setTitle(`Answer: ${op1}`);
          break;
        } else if(searchedtext.search(op2.toLocaleLowerCase()) >= 0){
          questionembed.setTitle(`Answer: ${op2}`);
          break;
        }else if(searchedtext.search(op3.toLocaleLowerCase()) >= 0){
          questionembed.setTitle(`Answer: ${op3}`);
          break;
        }else if(searchedtext.search(op4.toLocaleLowerCase()) >= 0){
          questionembed.setTitle(`Answer: ${op4}`);
          break;
        }
        i++;
        // if(i>4) break;
      }
      await message.channel.send({ content: `<@${message.interaction.user.id}>`, embeds: [questionembed] }) // prints the result
}}
})

client.login(TOKEN);
