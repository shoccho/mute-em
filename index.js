const Discord  = require('discord.js');

const client = new Discord.Client();

const prefix='-';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js') );
const getMethods = (obj) => {
    let properties = new Set()
    let currentObj = obj
    do {
      Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
    } while ((currentObj = Object.getPrototypeOf(currentObj)))
    return [...properties.keys()].filter(item => typeof obj[item] === 'function')
  }
  
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.on('message',async message => {

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!message.guild) return;

    if (message.content === '-mute') {
    // Only try to join the sender's voice channel if they are in one themselves
    
        if (message.member.voice.channel) {
        //const connection = await message.member.voice.channel.join();
        let channel = message.member.voice.channel;
        for (let member of channel.members) {
            member[1].voice.setMute('true');
        // console.log(getMethods(member[1].voice))
            
        }
        
        } else {
        message.reply('You need to join a voice channel first!');
        }

    }
    else if (message.content === '-unmute') {
        // Only try to join the sender's voice channel if they are in one themselves
        
            if (message.member.voice.channel) {
            //const connection = await message.member.voice.channel.join();
            let channel = message.member.voice.channel;
            for (let member of channel.members) {
                member[1].voice.setMute('false');
            // console.log(getMethods(member[1].voice))
                
            }
            
            } else {
            message.reply('You need to join a voice channel first!');
            }
    
        }
        
    
    else if(command ==='ping'){
        client.commands.get('ping').execute(message,args);

    }
    else if(command==='help') {
        message.reply("send -mute to mute and -unmute to unmute simpul")
    }

});

client.once('ready',()=>{
    console.log("onilne");
})

client.login('NzcwMzcxNDI4NjQwODgyNzE4.X5cmTQ.7cXlPROLyGDipACaqscCMkJ-9Sk');