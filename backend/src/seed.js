import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import { User } from './models/user.js';
import { Post } from './models/post.js';
import { connectDB, closeDB } from './configs/database.js';

/*

ESSE ARQUIVO É SOMENTE PARA POPULAR O BANCO DE DADOS COM ALGUNS USUÁRIOS E POSTAGENS INICIAIS PARA MELHOR VISUALIZAÇÃO E ENTENDIMENTO.
TAMBÉM É IMPORTANTE O USO CASO FOR SEGUIR AS ETAPAS SUGERIDAS NO README PRINCIPAL

*/

const seedDatabase = async () => {
    await connectDB();

    // Limpa as coleções existentes
    await User.deleteMany({});
    await Post.deleteMany({});

    // Função para criptografar a senha - Esse tem que ser colocado aqui se não quando for altenticar o usuário para logar, dará erro
    const hashPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    };

    // Cria alguns usuários
    const users = await User.insertMany([
        {
            username: 'Danyel492',
            email: 'danyel492@email.com',
            password: await hashPassword('admin'),
            is_admin: true
        },
        {
            username: 'Milena.make',
            email: 'milena.make@email.com',
            password: await hashPassword('1234')
        },
        {
            username: 'PauloGym',
            email: 'paulogym@email.com',
            password: await hashPassword('1234')
        },
        {
            username: 'GuiRocha',
            email: 'guirocha@email.com',
            password: await hashPassword('1234')
        },
        {
            username: 'TroladorMaster',
            email: 'troladormaster@email.com',
            password: await hashPassword('1234'),
            is_active: false
        },
        {
            username: 'Mabel_Maria',
            email: 'mabelmaria@email.com',
            password: await hashPassword('1234')
        },
        {
            username: 'ThyagoPrates',
            email: 'thyagoprates@email.com',
            password: await hashPassword('1234')
        },
        {
            username: 'Goku.Programador',
            email: 'gokuprogramador@email.com',
            password: await hashPassword('1234')
        }
    ]);

    // Cria algumas postagens
    await Post.insertMany([
        {
            title: 'Bem-vindo ao meu Blog: Seu Guia para o Sucesso!',
            content: `Olá, pessoal!

É com grande entusiasmo que dou as boas-vindas a todos. Este espaço foi criado com muito carinho e dedicação como estudo e treinamento das minhas habilidade full stack.

Como usar o blog?
Navegar pelo blog é muito simples!

Página inicial: Aqui você encontrará os posts mais recentes de todos os usuários cadastrados. Não tem cadastro? Não tem problema! Você ainda consegue visualizar todas as postagens.

Crie conteúdo: Não precisa ficar apenas de expectador nesse local incrível. Faça agora mesmo seu cadastro e comece a impressonais as pessoas.

Pianel de controle: Após se cadastrar, você poderá, além de pode começar a criar suas postagens, ter acesso ao painel de controle dos usuários. Nesse local você poderá visualizar todas as suas postagens, editar e excluir.

Não fique de fora e venha com a gente contruir um centro de informações, curiosidades e entretenimento.

Atenciosamente,

Danyel

Administrador do Blog`,
            author: 'Danyel492',
            is_active: true
        },
        {
            title: 'Arrow Functions: Simplificando seu Código JavaScript',
            content: `O que são Arrow Functions?

As arrow functions são uma forma mais concisa de escrever funções em JavaScript. Elas foram introduzidas no ECMAScript 6 (ES6) e oferecem uma sintaxe mais curta e algumas vantagens em relação às funções tradicionais.

Vantagens:

-Sintaxe mais curta: As arrow functions são mais concisas do que as funções tradicionais, o que torna o código mais legível e fácil de escrever.

-'this' lexical: Em funções tradicionais, o valor de 'this' é dinâmico e pode variar dependendo de como a função é chamada. Em arrow functions, o valor de 'this' é determinado lexicalmente, ou seja, é o mesmo valor de 'this' no escopo circundante. Isso evita alguns problemas comuns relacionados ao uso de 'this'.

Quando usar Arrow Functions?

As arrow functions são uma ótima opção para funções simples e curtas, como as que são usadas em callbacks ou como argumentos para outras funções. Elas também são úteis quando você precisa garantir que o valor de 'this' seja consistente.

Conclusão
As arrow functions são um recurso poderoso do JavaScript que pode simplificar seu código e torná-lo mais legível. Se você ainda não está usando arrow functions, experimente e veja como elas podem melhorar seu fluxo de trabalho!

Até a próxima, pessoal!`,
            author: 'GuiRocha',
            is_active: true
        },
        {
            title: 'Mulheres na Programação: Quebrando Barreiras e Inspirando o Futuro',
            content: `Hoje, quero falar sobre um tema que me interessa muito: a presença das mulheres na programação.

A programação é um campo em constante crescimento, com novas tecnologias e oportunidades surgindo o tempo todo. No entanto, ainda existe uma grande disparidade entre o número de homens e mulheres que trabalham na área.

Segundo dados do IBGE, apenas 18,5% dos profissionais de TI no Brasil são mulheres. Isso significa que a maioria dos desenvolvedores são homens.

Mas por que isso acontece? Existem vários fatores que contribuem para essa disparidade, como a falta de incentivo e visibilidade para as mulheres na área, a cultura machista e a falta de representatividade feminina em cargos de liderança.

No entanto, é importante destacar que a situação está mudando. Cada vez mais mulheres estão se interessando pela programação e buscando se capacitar para ingressar no mercado de trabalho.

Além disso, muitas empresas estão se esforçando para criar um ambiente mais inclusivo e acolhedor para as mulheres.

Eu acredito que é fundamental quebrarmos essas barreiras e incentivarmos mais mulheres a se dedicarem à programação. Afinal, a diversidade é essencial para o desenvolvimento de soluções inovadoras e para a construção de um mundo mais justo e igualitário.

Se você é mulher e está interessada em aprender a programar, não tenha medo! Existem diversas opções de cursos e comunidades online que podem te ajudar.

E se você é homem, apoie as mulheres que estão na área e ajude a criar um ambiente mais inclusivo.

Juntos, podemos fazer a diferença!

Um grande abraço`,
            author: 'Milena.make',
            is_active: true
        },
        {
            title: 'Mulheres e a programação!!!',
            content: `Vou falar sobre um assunto que está na moda: a presença das mulheres na programação.

Sei que muitos vão me criticar por isso, mas preciso ser sincero: não acredito que as mulheres devam estar na área da programação.

Acho que elas são mais adequadas para outras profissões, como secretárias, professoras ou enfermeiras.

A programação é um campo muito complexo e exige muita lógica e raciocínio, habilidades que, convenhamos, não são o forte das mulheres.

Além disso, as mulheres são muito emocionais e sensíveis, o que pode atrapalhar o seu desempenho na programação.

Sei que estou sendo polêmico, mas essa é a minha opinião.

Se você é mulher e está lendo isso, não se ofenda. É apenas a minha visão sobre o assunto.

Acho que cada um tem o direito de ter a sua opinião, mesmo que ela seja diferente da dos outros.

E você, o que acha? Concorda comigo ou não?`,
            author: 'PauloGym',
            is_active: false
        },
        {
            title: 'Retratação sobre postagem desativada: Mulheres e a programação!!!',
            content: `Quero me desculpar por uma postagem que fiz recentemente. Eu escrevi uma postagem que era inadequada e ofensiva. Apos a postagem ser desativada pelo administrador do site, eu refleti sobre o que eu disse e percebi que não deveria ter postado aquilo.

Eu respeito a opinião de todos e não tenho o direito de ofender ninguém.

Eu aprendi com meu erro e prometo que não vou mais fazer isso.

Eu peço desculpas a todos que se sentiram ofendidos com a minha postagem.

Eu espero que vocês possam me perdoar.

Obrigado por me ouvirem.`,
            author: 'PauloGym',
            is_active: true
        },
        {
            title: 'Eu vim só pra trolaaaaar',
            content: `Não quero nada com nada e vou apenas trolar o feed de postagens
            
            vou escrever
            um monte
            de coisas
            sem sentido`,
            author: 'TroladorMaster',
            is_active: false
        },
        {
            title: 'xxxxxxxxxxxxxxxxxxxxxxxx',
            content: `asduasd8wf3tb45yner
            tgndr
            tfgnd
            rgh
            nd56yn56yn5untrf
            ughnf
            ghnf
            ghn
            
            fnghn56hnrthn
            rfth
            n56
            ut
            rnj
            tghj
            nghjthjjk`,
            author: 'TroladorMaster',
            is_active: false
        },
        {
            title: 'Os Impactos da Inteligência Artificial',
            content: `Hoje, quero falar sobre um tema que tem me fascinado ultimamente: a inteligência artificial (IA).

A IA é uma área da ciência da computação que se dedica ao desenvolvimento de sistemas capazes de realizar tarefas que normalmente requerem inteligência humana.

Nos últimos anos, a IA tem avançado rapidamente e já está presente em diversas áreas da nossa vida, como na medicina, na indústria, no transporte e na educação.

A IA tem o potencial de trazer muitos benefícios para a sociedade, como a automação de tarefas repetitivas, a melhoria da eficiência e a personalização de serviços.

No entanto, a IA também traz alguns desafios, como a questão do desemprego, a privacidade e a ética.

É importante que discutamos os impactos da IA e que nos preparemos para o futuro que nos espera.

Espero que esta postagem tenha te ajudado a entender um pouco mais sobre a inteligência artificial.`,
            author: 'ThyagoPrates',
            is_active: true
        },
        
    ]);

    console.log('Banco de dados populado com sucesso!');
    await closeDB();
};

seedDatabase().catch((error) => {
    console.error('Erro ao popular o banco de dados:', error);
    process.exit(1);
});