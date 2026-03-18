import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { ApiService } from '../services/api';
import { Logger } from '../services/logger';

export const ProfileCommand = {
  async execute(interaction: ChatInputCommandInteraction, api: ApiService, logger: Logger) {
    await interaction.deferReply();

    try {
      const [user, collections, favorites, rankings] = await Promise.all([
        api.getUserProfile(interaction.user.id),
        api.getUserCollections(interaction.user.id),
        api.getFavorites(interaction.user.id),
        api.getRankings('popularity', 1, 100),
      ]);

      const globalRank = rankings.data?.findIndex((c: any) => c.anilistId === collections[0]?.anilistId) + 1 || 'N/A';

      const memberSince = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown';

      const embed = new EmbedBuilder()
        .setTitle(`👤 ${interaction.user.username}'s Profile`)
        .setThumbnail(interaction.user.displayAvatarURL())
        .setColor(0x9B59B6)
        .setFooter({ text: 'Waifu Roulette' })
        .setTimestamp();

      embed.addFields(
        { name: '📦 Collection', value: `**${collections.length}** characters`, inline: true },
        { name: '❤️ Favorites', value: `**${favorites.length}** characters`, inline: true },
        { name: '🏆 Global Rank', value: `#${globalRank}`, inline: true },
        { name: '📅 Member Since', value: memberSince, inline: true }
      );

      if (collections.length > 0) {
        const recentChars = collections.slice(0, 5).map((c: any) => c.name).join(', ');
        embed.addFields({ name: '🎭 Recent Characters', value: recentChars, inline: false });
      }

      if (favorites.length > 0) {
        const topFavorites = favorites.slice(0, 5).map((c: any) => c.name).join(', ');
        embed.addFields({ name: '⭐ Top Favorites', value: topFavorites, inline: false });
      }

      await interaction.editReply({ embeds: [embed] });

    } catch (error) {
      logger.error('Profile failed', error);
      await interaction.editReply('❌ Failed to fetch profile.');
    }
  }
};
