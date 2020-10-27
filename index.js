const Discord  = require('discord.js');

const client = new Discord.Client();

const prefix='-';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js') );


readToken = function(){
    fs.readFile('./token', (err, data) => { 
        if (err) throw err; 
        
        client.login(data.toString());
    });
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
        client.commands.get('mute').execute(message,args);
    }
    else if (message.content === '-unmute') {
        client.commands.get('unmute').execute(message,args);
    
    }   
    else if(command ==='ping'){
        client.commands.get('ping').execute(message,args);

    }
    else if(command==='help') {
        message.reply("send -mute to mute and -unmute to unmute simpul")
    }

});

readToken();
client.on('ready', () => {
    client.user.setActivity('-help', { type: 'LISTENING' });
});
