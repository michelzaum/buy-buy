import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { name: 'Eletrônicos' },
      { name: 'Roupas' },
      { name: 'Livros' },
    ],
    skipDuplicates: true,
  });

  const categories = await prisma.category.findMany();
  const eletronicos = categories.find((c) => c.name === 'Eletrônicos')!;
  const roupas = categories.find((c) => c.name === 'Roupas')!;
  const livros = categories.find((c) => c.name === 'Livros')!;

  await prisma.product.createMany({
    data: [
      {
        name: 'iPhone 14 Pro',
        description: 'Smartphone Apple com câmera tripla e tela OLED de 6,1 polegadas.',
        price: 8699.00,
        imageUrl: 'https://images.unsplash.com/photo-1705305835960-3271b7e9ae9c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        categoryId: eletronicos.id,
      },
      {
        name: 'Fone Sony MDR-XB450',
        description: 'Fone de ouvido sem fio com cancelamento de ruído de última geração.',
        price: 1899.90,
        imageUrl: 'https://images.unsplash.com/photo-1619032084771-cb4e65810cd1?q=80&w=676&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        categoryId: eletronicos.id,
      },
      {
        name: 'Smartwatch esportivo',
        description: 'Relógio inteligente com monitoramento de atividades físicas e batimentos cardíacos.',
        price: 649.90,
        imageUrl: 'https://images.unsplash.com/photo-1617625802912-cde586faf331?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        categoryId: eletronicos.id,
      },
      {
        name: 'Notebook ultrafino',
        description: 'Notebook leve e potente com processador moderno e SSD de 512GB.',
        price: 5499.00,
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        categoryId: eletronicos.id,
      },
      {
        name: 'Camiseta casual branca',
        description: 'Camiseta 100% algodão, confortável e ideal para o dia a dia.',
        price: 49.90,
        imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        categoryId: roupas.id,
      },
      {
        name: 'Calça jeans azul',
        description: 'Calça estilosa com acabamento em jeans e bolsos frontais.',
        price: 159.90,
        imageUrl: 'https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        categoryId: roupas.id,
      },
      {
        name: 'Vestido leve',
        description: 'Vestido confortável, ideal para dias quentes.',
        price: 129.90,
        imageUrl: 'https://plus.unsplash.com/premium_photo-1670444605883-f3fbf4fcfac8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        categoryId: roupas.id,
      },
      {
        name: 'Tênis branco urbano',
        description: 'Tênis casual branco com sola emborrachada e design minimalista.',
        price: 279.90,
        imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        categoryId: roupas.id,
      },
      {
        name: 'Sueter rosa',
        description: 'Sueter macio e estiloso, ideal para dias frescos.',
        price: 139.90,
        imageUrl: 'https://plus.unsplash.com/premium_photo-1705554519869-fdcebc4ba94b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        categoryId: roupas.id,
      },
      {
        name: 'Livro: 1984 - George Orwell',
        description: 'Romance distópico clássico que explora uma sociedade totalitária.',
        price: 39.90,
        imageUrl: 'https://images.unsplash.com/photo-1622609184693-58079bb6742f?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        categoryId: livros.id,
      },
      {
        name: 'Livro: O Pequeno Príncipe',
        description: 'Uma fábula poética sobre amizade e humanidade.',
        price: 29.90,
        imageUrl: 'https://plus.unsplash.com/premium_photo-1726768903173-8cac387e97ab?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        categoryId: livros.id,
      },
      {
        name: 'Livro: Mindset - Carol S. Dweck',
        description: 'Entenda como a mentalidade pode transformar sua vida.',
        price: 59.90,
        imageUrl: 'https://images.unsplash.com/photo-1634621389197-d5f3b0056861?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        categoryId: livros.id,
      },
      {
        name: 'Livro: A Revolução dos Bichos',
        description: 'Allegoria política escrita por George Orwell.',
        price: 36.90,
        imageUrl: 'https://images.unsplash.com/photo-1628697529678-24beeaed0b70?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        categoryId: livros.id,
      },
      {
        name: 'Livro: Sapiens - Yuval Harari',
        description: 'Uma breve história da humanidade.',
        price: 64.90,
        imageUrl: 'https://images.unsplash.com/photo-1519764340700-3db40311f21e?q=80&w=1375&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        categoryId: livros.id,
      },
    ],
  });

  console.log('✔ Seed executado com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
