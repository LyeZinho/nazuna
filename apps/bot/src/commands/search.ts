import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { ApiService } from '../services/api';
import { SafebooruService } from '../services/safebooru';
import { Logger } from '../services/logger';

export const SearchCommand = {
  async execute(interaction: ChatInputCommandInteraction, api: ApiService, logger: Logger) {
    await interaction.deferReply();

    const query = interaction.options.getString('query')!;
    const limit = Math.min(interaction.options.getInteger('limit') || 5, 10);
    const showImages = interaction.options.getBoolean('images') ?? true;

    try {
      const results = await api.searchCharacters(query, limit);

      if (!results.data || results.data.length === 0) {
        const embed = new EmbedBuilder()
          .setTitle(`🔍 No results for "${query}"`)
          .setDescription('*Try a different search term.*')
          .setColor(0xFF6B6B)
          .setFooter({ text: 'Waifu Roulette' });
        
        await interaction.editReply({ embeds: [embed] });
        return;
      }

      const safebooru = new SafebooruService();
      const firstChar = results.data[0];

      const embed = new EmbedBuilder()
        .setTitle(`🔍 Search: ${query}`)
        .setURL(`https://anilist.co/character/${firstChar.anilistId}`)
        .setColor(0x3498DB)
        .setFooter({ text: 'Waifu Roulette' })
        .setTimestamp();

      const characters = results.data.map((c: any, i: number) => {
        const role = c.role === 'protagonist' ? '👑' : c.role === 'antagonist' ? '😈' : '💼';
        return `${i + 1}. ${role} **${c.name}** \`[ID: ${c.anilistId}]\``;
      }).join('\n');

      embed.addFields({ name: `📋 Results (${results.data.length})`, value: characters });

      if (firstChar.workTitle) {
        embed.addFields({ name: '📚 Work', value: firstChar.workTitle, inline: true });
      }
      if (firstChar.popularity) {
        embed.addFields({ name: '⭐ Popularity', value: `#${firstChar.popularity.toLocaleString()}`, inline: true });
      }

      if (showImages) {
        try {
          const images = await safebooru.searchByCharacterName(firstChar.name, 3);
          
          if (images.length > 0) {
            const imageInfo = safebooru.formatPostForDiscord(images[0]);
            embed.setImage(imageInfo.url);
            embed.addFields({ name: '🖼️ Image', value: `[View on Safebooru](https://safebooru.org/index.php?page=post&s=view&id=${images[0].id})`, inline: true });
            embed.addFields({ name: '👍 Score', value: imageInfo.score, inline: true });
          }
        } catch (e) {
          logger.warn('Failed to fetch Safebooru images', e);
        }
      }

      embed.addFields({ name: '💡 Tip', value: 'Use `/gift @user <ID>` to gift a character!', inline: false });

      await interaction.editReply({ embeds: [embed] });

    } catch (error) {
      logger.error('Search failed', error);
      await interaction.editReply('❌ Search failed. Please try again.');
    }
  }
};
