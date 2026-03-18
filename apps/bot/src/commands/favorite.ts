import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { ApiService } from '../services/api';
import { SafebooruService } from '../services/safebooru';
import { Logger } from '../services/logger';

export const FavoriteCommand = {
  async execute(interaction: ChatInputCommandInteraction, api: ApiService, logger: Logger) {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case 'add':
        await this.add(interaction, api, logger);
        break;
      case 'remove':
        await this.remove(interaction, api, logger);
        break;
      case 'list':
        await this.list(interaction, api, logger);
        break;
    }
  },

  async add(interaction: ChatInputCommandInteraction, api: ApiService, logger: Logger) {
    await interaction.deferReply();

    const characterQuery = interaction.options.getString('character');

    try {
      const search = await api.searchCharacters(characterQuery!, 1);
      
      if (!search.data || search.data.length === 0) {
        await interaction.editReply('❌ Character not found.');
        return;
      }

      const character = search.data[0];
      await api.addFavorite(interaction.user.id, character.anilistId);

      const safebooru = new SafebooruService();
      const images = await safebooru.searchByCharacterName(character.name, 1);
      const imageUrl = images.length > 0 ? safebooru.formatPostForDiscord(images[0]).url : null;

      const embed = new EmbedBuilder()
        .setTitle('❤️ Favorite Added!')
        .setDescription(`**${character.name}** has been added to your favorites!`)
        .setColor(0xE91E63)
        .setFooter({ text: 'Waifu Roulette' })
        .setTimestamp();

      if (imageUrl) {
        embed.setImage(imageUrl);
      }

      if (character.workTitle) {
        embed.addFields({ name: '📚 Work', value: character.workTitle, inline: true });
      }
      if (character.popularity) {
        embed.addFields({ name: '⭐ Popularity', value: `#${character.popularity.toLocaleString()}`, inline: true });
      }

      await interaction.editReply({ embeds: [embed] });

      await api.logLedger('favorite_added', interaction.user.id, interaction.guildId || '', character.anilistId);

    } catch (error) {
      logger.error('Favorite add failed', error);
      await interaction.editReply('❌ Failed to add favorite.');
    }
  },

  async remove(interaction: ChatInputCommandInteraction, api: ApiService, logger: Logger) {
    await interaction.deferReply();

    const characterQuery = interaction.options.getString('character');

    try {
      const search = await api.searchCharacters(characterQuery!, 1);
      
      if (!search.data || search.data.length === 0) {
        await interaction.editReply('❌ Character not found.');
        return;
      }

      const character = search.data[0];
      await api.removeFavorite(interaction.user.id, character.anilistId);

      const embed = new EmbedBuilder()
        .setTitle('💔 Favorite Removed')
        .setDescription(`**${character.name}** has been removed from your favorites.`)
        .setColor(0x95A5A6)
        .setFooter({ text: 'Waifu Roulette' })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });

      await api.logLedger('favorite_removed', interaction.user.id, interaction.guildId || '', character.anilistId);

    } catch (error) {
      logger.error('Favorite remove failed', error);
      await interaction.editReply('❌ Failed to remove favorite.');
    }
  },

  async list(interaction: ChatInputCommandInteraction, api: ApiService, logger: Logger) {
    await interaction.deferReply();

    try {
      const favorites = await api.getFavorites(interaction.user.id);

      if (!favorites || favorites.length === 0) {
        const embed = new EmbedBuilder()
          .setTitle('❤️ Your Favorites')
          .setDescription('*You have no favorites yet.*')
          .setColor(0xE91E63)
          .setFooter({ text: 'Use /favorite add to add characters!' });
        
        await interaction.editReply({ embeds: [embed] });
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle('❤️ Your Favorites')
        .setDescription(`**Total: ${favorites.length} characters**`)
        .setColor(0xE91E63)
        .setFooter({ text: 'Waifu Roulette' })
        .setTimestamp();

      const characters = favorites.slice(0, 15).map((c: any, i: number) => {
        return `${i + 1}. **${c.name}**`;
      }).join('\n');

      embed.addFields({ name: 'Characters', value: characters });

      if (favorites.length > 15) {
        embed.addFields({ name: '\u200B', value: `*...and ${favorites.length - 15} more*` });
      }

      await interaction.editReply({ embeds: [embed] });

    } catch (error) {
      logger.error('Favorite list failed', error);
      await interaction.editReply('❌ Failed to fetch favorites.');
    }
  }
};
