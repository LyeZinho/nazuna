import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { ApiService } from '../services/api';
import { Logger } from '../services/logger';

export const CollectionCommand = {
  async execute(interaction: ChatInputCommandInteraction, api: ApiService, logger: Logger) {
    await interaction.deferReply();

    const targetUser = interaction.options.getUser('user') || interaction.user;
    const serverId = interaction.guildId;

    if (!serverId) {
      await interaction.editReply('❌ This command must be used in a server.');
      return;
    }

    try {
      const collection = await api.getUserCollections(targetUser.id, serverId);

      if (!collection || collection.length === 0) {
        const embed = new EmbedBuilder()
          .setTitle(`📦 ${targetUser.username}'s Collection`)
          .setDescription('*No characters collected yet.*')
          .setColor(0xFF6B6B)
          .setThumbnail(targetUser.displayAvatarURL())
          .setFooter({ text: 'Use /roulette to collect characters!' });
        
        await interaction.editReply({ embeds: [embed] });
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle(`📦 ${targetUser.username}'s Collection`)
        .setDescription(`**Total: ${collection.length} characters**`)
        .setColor(0x4ECDC4)
        .setThumbnail(targetUser.displayAvatarURL())
        .setFooter({ text: 'Nazuna Bot Collection' })
        .setTimestamp();

      const characters = collection.slice(0, 15).map((c: any, i: number) => {
        const sourceEmoji = c.source === 'gift' ? '🎁' : '🎲';
        return `${sourceEmoji} ${c.name}`;
      }).join('\n');

      embed.addFields({ name: 'Characters', value: characters });

      if (collection.length > 15) {
        embed.addFields({ name: '\u200B', value: `*...and ${collection.length - 15} more*` });
      }

      await interaction.editReply({ embeds: [embed] });

    } catch (error) {
      logger.error('Collection failed', error);
      await interaction.editReply('❌ Failed to fetch collection.');
    }
  }
};
