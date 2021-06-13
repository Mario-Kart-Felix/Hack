# Scrapes Player Data from NFL Reference
from bs4 import BeautifulSoup
from Objects import Player, PlayerGameStats
import requests

def NFLScraper(player, year):
    RICE_URL = "https://www.pro-football-reference.com/players/R/RiceJe00/gamelog/1985/"
    source = requests.get(RICE_URL)
    soup = BeautifulSoup(source.content, "html.parser")
    stats = soup.find("div", {"id" : "div_stats"})
    table = stats.find("table")
    rows = table.findAll("tbody")
    for row in rows:
        row_data = row.findAll("td")
        gameStats = PlayerGameStats("Jerry Rice", row_data)
        print(gameStats)
    

NFLScraper("", "")
