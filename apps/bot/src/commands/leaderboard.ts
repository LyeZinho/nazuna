import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { ApiService } from '../services/api';
import { Logger } from '../services/logger';

const TROPHY_EMOJIS = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

export const LeaderboardCommand = {
  async execute(interaction: ChatInputCommandInteraction, api: ApiService, logger: Logger) {
    await interaction.deferReply();

    const serverId = interaction.guildId;
    const page = interaction.options.getInteger('page') || 1;

    if (!serverId) {
      await interaction.editReply('❌ This command must be used in a server.');
      return;
    }

    try {
      const leaderboard = await api.getServerLeaderboard(serverId, page);

      if (!leaderboard || leaderboard.length === 0) {
        const embed = new EmbedBuilder()
          .setTitle('🏆 Server Leaderboard')
          .setDescription('*No characters collected in this server yet.*')
          .setColor(0xFFD700)
          .setFooter({ text: 'Use /roulette to start collecting!' });
        
        await interaction.editReply({ embeds: [embed] });
        return;
      }

      const userCounts: Record<string, number> = {};
      for (const entry of leaderboard) {
        userCounts[entry.userId] = (userCounts[entry.userId] || 0) + 1;
      }

      const topUsers = Object.entries(userCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

      const userLeaderboard = topUsers.map(([userId, count], i) => {
        return `${TROPHY_EMOJIS[i] || '•'} **${count}** characters - <@${userId}>`;
      }).join('\n');

      const characterLeaderboard = leaderboard.slice(0, 10).map((c: any, i: number) => {
        return `${TROPHY_EMOJIS[i] || '•'} ${c.name}`;
      }).join('\n');

      const embed = new EmbedBuilder()
        .setTitle('🏆 Server Leaderboard')
        .setDescription(`**Page ${page}** • ${leaderboard.length} total entries`)
        .setColor(0xFFD700)
        .setFooter({ text: `Waifu Roulette • ${interaction.guild?.name || 'Server'}` })
        .setTimestamp();

      if (characterLeaderboard) {
        embed.addFields({ name: '🎭 Top Characters', value: characterLeaderboard });
      }

      if (userLeaderboard) {
        embed.addFields({ name: '👥 Top Collectors', value: userLeaderboard });
      }

      await interaction.editReply({ embeds: [embed] });

    } catch (error) {
      logger.error('Leaderboard failed', error);
      await interaction.editReply('❌ Failed to fetch leaderboard.');
    }
  }
};
