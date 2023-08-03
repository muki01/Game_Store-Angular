import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private games: any[] = [
    {
      name: 'RED DEAD REDEMPTION 2 DOWNLOAD FREE',
      type: 'adventure',
      image: 'https://www.ireddead.com/bigimage/1802/',
      description:'Red Dead Redemption 2 is a 2018 action-adventure game developed and published by Rockstar Games...',
      creator:'Muki',
      date: 'July 20, 2023',
    },

    {  
      name:"Assasin's Cread 2 Download Free",
      type:"action",
      image:"https://i.pinimg.com/originals/96/4a/d0/964ad08a90352b8b1b6fe6d68ae4cce2.jpg",
      description:"Assassins Creed II is a 2009 action-adventure video game developed by Ubisoft Montréal and published by Ubisoft.[1] It is the second major installment in the Assassins Creed series, and the sequel to 2007's Assassin's Creed. The game was first released on the PlayStation 3 and Xbox 360 in November 2009, and was later made available on Microsoft Windows in March 2010 and OS X in October 2010. Remastered versions of the game and its two sequels, Assassin's Creed: Brotherhood and Assassin's Creed: Revelations, were released as part of The Ezio Collection compilation for the PlayStation 4 and Xbox One on November 15, 2016, and for the Nintendo Switch on February 17, 2022.The games plot is set in a fictional history of real-world events and follows the millennia-old struggle between the Assassins, who fight to preserve peace and free will, and the Templars, who desire peace through control. The framing story is set in the 21st century and follows Desmond Miles as he relives the genetic memories of his ancestor, Ezio Auditore da Firenze, to uncover the mysteries left behind by an ancient race known as the First Civilization in the hope of ending the Assassin-Templar conflict. The main narrative takes place at the height of the Renaissance in Italy from 1476 to 1499, and follows Ezios journey as an Assassin while seeking revenge against those responsible for the death of his father and brothers. Gameplay focuses on using Ezios combat, stealth, and parkour abilities to defeat enemies and explore the environment. The game features a large open world comprising several Italian cities, including Florence, Venice, Monteriggioni, San Gimignano, and Forlì, all of which have been accurately recreated to fit the games historical setting.",
      creator:'Muki',
      date:"June 20, 2023",
    },

    {
      name:"OUTLAST 2 DOWNLOAD FREE",
      type:"horror",
      image:"https://wallpapercave.com/wp/wp1872479.jpg",
      description:"Outlast 2 (stylized as OU+LASTII) is a 2017 first-person psychological…",
      creator:'Muki',
      date:"July 26, 2023",
    },

  ];

  getRecentGames(count: number): any[] {
    return this.games
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  }

  getOldestGames(count: number): any[] {
    return this.games
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, count);
  }

  getGamesByCategory(category: string): any[] {
    return this.games.filter((game) => game.type === category);
  }

  addGame(newGame: any) {
    this.games.push(newGame);
    console.log(this.games); 
  }
}
