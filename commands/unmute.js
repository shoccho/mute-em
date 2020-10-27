module.exports={
    name:'unmute',
    description:'unmutes everyone in a voice chat',
    execute(message,args){
        if (message.member.voice.channel) {
            //const connection = await message.member.voice.channel.join();
            let channel = message.member.voice.channel;
            for (let member of channel.members) {
                member[1].voice.setMute('false');
            
            }
        } 
        else {
            message.reply('You need to join a voice channel first!');
        }
    }
}