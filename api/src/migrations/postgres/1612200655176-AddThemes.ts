import { MigrationInterface, QueryRunner } from 'typeorm';
import { Theme } from '../../entity/Theme';

export class AddThemes1612200655176 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const { manager } = queryRunner;

    const lightTheme = new Theme();
    lightTheme.name = 'Light';
    lightTheme.json = {
      primaryColor: '#ee6e73',
      backgroundColor: '#ffffff',
      textColor: '#222222',
    };

    const darkTheme = new Theme();
    darkTheme.name = 'Dark';
    darkTheme.json = {
      primaryColor: '#000000',
      backgroundColor: '#111111',
      textColor: '#ffffff',
    };

    await manager.save(lightTheme);
    await manager.save(darkTheme);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('theme');
  }
}
