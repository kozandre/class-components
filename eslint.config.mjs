// ========================================
// ESLINT КОНФИГУРАЦИЯ ДЛЯ REACT + TYPESCRIPT
// ========================================

// Импорты для работы с путями в ES модулях
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// FlatCompat - помогает использовать старые конфиги в новом формате ESLint 9.x
import { FlatCompat } from '@eslint/eslintrc';

// Плагины для различных технологий
import tsPlugin from '@typescript-eslint/eslint-plugin'; // Правила для TypeScript
import tsParser from '@typescript-eslint/parser'; // Парсер TypeScript кода
import importPlugin from 'eslint-plugin-import'; // Правила для import/export
import reactPlugin from 'eslint-plugin-react'; // Правила для React
import reactHooksPlugin from 'eslint-plugin-react-hooks'; // Правила для React Hooks
import simpleImportSort from 'eslint-plugin-simple-import-sort';

// Получаем текущую директорию (аналог __dirname в CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Создаем объект для совместимости со старыми конфигами
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// ========================================
// ОСНОВНАЯ КОНФИГУРАЦИЯ
// ========================================
const eslintConfig = [
  // Наследуем готовые наборы правил (рекомендованные конфигурации)
  ...compat.extends(
    'plugin:react/recommended', // Базовые правила для React
    'plugin:@typescript-eslint/recommended', // Базовые правила для TypeScript
    'plugin:prettier/recommended' // Интеграция с Prettier
  ),

  // Основная конфигурация
  {
    // ========================================
    // НАСТРОЙКИ ЯЗЫКА И ПАРСЕРА
    // ========================================
    languageOptions: {
      parser: tsParser, // Используем TypeScript парсер
      parserOptions: {
        ecmaVersion: 'latest', // Поддержка новейших возможностей JS
        sourceType: 'module', // Используем ES модули (import/export)
        ecmaFeatures: {
          jsx: true, // Включаем поддержку JSX
        },
        // project: "./tsconfig.json", // Путь к tsconfig для типо-aware правил
        // Закомментировано - может вызывать проблемы на некоторых проектах
      },
    },

    // ========================================
    // НАСТРОЙКИ ПЛАГИНОВ
    // ========================================
    settings: {
      react: {
        version: 'detect', // Автоматически определяем версию React
      },
    },

    // Подключаем плагины
    plugins: {
      import: importPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@typescript-eslint': tsPlugin,
      'simple-import-sort': simpleImportSort,
    },

    // ========================================
    // ПРАВИЛА ЛИНТЕРА
    // ========================================
    rules: {
      // ========================================
      // ПРАВИЛА ФОРМАТИРОВАНИЯ
      // ========================================

      // Требует пробелы внутри фигурных скобок: { foo } вместо {foo}
      'object-curly-spacing': ['error', 'always'],

      // Запятые в конце строки только в многострочных объектах/массивах
      'comma-dangle': ['error', 'only-multiline'],

      // ========================================
      // ПРАВИЛА ДЛЯ ИМПОРТОВ
      // ========================================

      // Сортировка внутри фигурных скобок — сортировка членов импорта (member sort).
      // https://eslint.org/docs/latest/rules/sort-imports
      'sort-imports': [
        'error',
        {
          ignoreMemberSort: false,
          ignoreDeclarationSort: true,
        },
      ],
      // Сортировка и группировка импортов
      'import/order': [
        'error',
        {
          'newlines-between': 'always-and-inside-groups', // Пустые строки между группами
          groups: [
            'builtin', // Встроенные модули Node.js (fs, path)
            'external', // Внешние пакеты (react, lodash)
            'internal', // Внутренние модули проекта
            ['parent', 'sibling'], // Относительные импорты (../, ./)
            'object', // Импорты объектов
            'type', // Импорты типов TypeScript
            'index', // Импорты из index файлов
          ],
          alphabetize: {
            order: 'asc', // Сортировка по алфавиту
            caseInsensitive: true, // Игнорировать регистр
          },
        },
      ],
      // "simple-import-sort/imports": "error",
      'simple-import-sort/exports': 'error',
      // Запрещает дублирование импортов из одного модуля
      'import/no-duplicates': 'off', // Отключено из-за проблем с TypeScript resolver

      // Импорты должны быть в начале файла
      'import/first': 'error',

      // Пустая строка после импортов
      'import/newline-after-import': 'error',

      // Отключено - TypeScript сам проверяет существование модулей
      'import/no-unresolved': 'off',

      // ========================================
      // ПРАВИЛА ДЛЯ REACT
      // ========================================

      // Отключено - TypeScript заменяет PropTypes для проверки типов
      'react/prop-types': 'off',

      // Требуем displayName для компонентов (особенно важно для forwardRef)
      'react/display-name': 'error',

      // React 17+ не требует импорт React в каждом файле с JSX
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',

      // Обязательный key prop для элементов в массивах
      'react/jsx-key': 'error',

      // Разрешаем использование индекса массива как key (иногда это нормально)
      'react/no-array-index-key': 'off',

      // Самозакрывающиеся теги: <Component /> вместо <Component></Component>
      'react/self-closing-comp': 'error',

      // Для boolean props используем краткую запись: <Component disabled /> вместо <Component disabled={true} />
      'react/jsx-boolean-value': ['error', 'never'],

      // ========================================
      // ПРАВИЛА ДЛЯ REACT HOOKS
      // ========================================

      // Правила хуков (нельзя вызывать в циклах, условиях и т.д.)
      'react-hooks/rules-of-hooks': 'error',

      // Предупреждение о отсутствующих зависимостях в useEffect
      'react-hooks/exhaustive-deps': 'warn',

      // ========================================
      // БАЗОВЫЕ ПРАВИЛА TYPESCRIPT
      // ========================================

      // Не требуем явного указания типа возвращаемого значения функций
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Не требуем типы для экспортируемых функций
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // Разрешаем пустые функции
      '@typescript-eslint/no-empty-function': 'off',

      // Не разрешаем require() в TypeScript файлах
      '@typescript-eslint/no-var-requires': 'warn',

      // ========================================
      // ПРАВИЛА БЕЗОПАСНОСТИ ТИПОВ
      // ========================================

      // Предупреждение при использовании any (лучше избегать)
      '@typescript-eslint/no-explicit-any': 'error',

      // Предупреждение о неиспользуемых переменных
      '@typescript-eslint/no-unused-vars': [
        'off', // Можно изменить на "warn" для более строгой проверки
        {
          argsIgnorePattern: '^_', // Игнорировать аргументы, начинающиеся с _
          varsIgnorePattern: '^_', // Игнорировать переменные, начинающиеся с _
          ignoreRestSiblings: true, // Игнорировать rest элементы в деструктуризации
        },
      ],

      // Предупреждение при использовании @ts-ignore и подобных комментариев
      '@typescript-eslint/ban-ts-comment': 'warn',

      // ========================================
      // ПРАВИЛА ДЛЯ ВНЕШНИХ БИБЛИОТЕК
      // ========================================
      // Эти правила отключены для работы с библиотеками типа i18next

      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',

      // ========================================
      // ОБЩИЕ ПРАВИЛА КАЧЕСТВА КОДА
      // ========================================

      // Используйте const для переменных, которые не переназначаются
      'prefer-const': 'warn',

      // Запрещаем var, используем let/const
      'no-var': 'error',

      // Предупреждение о console.log (забываем убрать в продакшене)
      // "no-console": "warn", // Закомментировано для разработки

      // Строгое сравнение: === вместо ==
      eqeqeq: ['error', 'always'],

      // Обязательные фигурные скобки для if/else
      // "curly": ["error", "all"], // Закомментировано - может быть слишком строгим
    },
  },

  // ========================================
  // ИГНОРИРУЕМЫЕ ФАЙЛЫ И ПАПКИ
  // ========================================
  {
    ignores: [
      '**/node_modules/**', // Внешние зависимости
      'build/**', // Собранные файлы
      'dist/**', // Дистрибутив
      '.react-router/**', // Кэш React Router
      '*.config.js', // Конфигурационные файлы
      '*.config.mjs',
      '*.config.ts',
      'vite.config.*', // Конфиги Vite
      'tailwind.config.*', // Конфиги Tailwind
      'upgrade/**',
    ],
  },
];

// ========================================
// ЭКСПОРТ КОНФИГУРАЦИИ
// ========================================
export default eslintConfig;
