import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { ApiService } from '../services/api';
import { Logger } from '../services/logger';

export const GiftCommand = {
  async execute(interaction: ChatInputCommandInteraction, api: ApiService, logger: Logger) {
    await interaction.deferReply();

    const targetUser = interaction.options.getUser('user');
    const characterIdStr = interaction.options.getString('character');
    const serverId = interaction.guildId;

    if (!serverId) {
      await interaction.editReply('❌ This command must be used in a server.');
      return;
    }

    if (targetUser.id === interaction.user.id) {
      await interaction.editReply('❌ You cannot gift a character to yourself!');
      return;
    }

    const characterId = parseInt(characterIdStr!);
    if (isNaN(characterId)) {
      await interaction.editReply('❌ Invalid character ID. Use /search to find character IDs.');
      return;
    }

    try {
      const character = await api.getCharacter(characterId);
      
      if (!character) {
        await interaction.editReply('❌ Character not found. Use /search to find valid character IDs.');
        return;
      }

      const collection = await api.getUserCollections(targetUser.id, serverId);
      const alreadyHas = collection.some((c: any) => c.anilistId === characterId);

      if (alreadyHas) {
        const embed = new EmbedBuilder()
          .setTitle('⚠️ Already Owned')
          .setDescription(`${targetUser} already has **${character.name}** in their collection!`)
          .setColor(0xFFA500)
          .setImage(character.imageUrl);
        
        await interaction.editReply({ embeds: [embed] });
        return;
      }

      await api.addToCollection(targetUser.id, serverId, characterId, 'gift');

      const embed = new EmbedBuilder()
        .setTitle('🎁 Gift Sent!')
        .setDescription(`💝 **${interaction.user.username}** gifted **${character.name}** to **${targetUser.username}**!`)
        .setImage(character.imageUrl)
        .setColor(0xFF69B4)
        .setFooter({ text: 'Waifu Roulette' })
        .setTimestamp();

      if (character.workTitle) {
        embed.addFields({ name: '📚 From', value: character.workTitle, inline: true });
      }

      await interaction.editReply({ 
        content: targetUser.toString(),
        embeds: [embed] 
      });

      await api.logLedger('character_gifted', interaction.user.id, serverId, characterId, { to: targetUser.id });

    } catch (error) {
      logger.error('Gift failed', error);
      await interaction.editReply('❌ Failed to send gift.');
    }
  }
};
