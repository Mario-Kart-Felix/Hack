# Objects used to interface the program

class Player():

    def __init__(self, name):
        self.name = name

    @property
    def get_name(self):
        return name

class PlayerGameStats():
    
    def __init__(self, player, rowObj):
        self.player = player
        self.Rk = int(rowObj[0].text)
        self.Date = rowObj[1].text
        self.G = int(rowObj[2].text)
        self.Week = int(rowObj[3].text)
        self.Age = float(rowObj[4].text)
        self.Tm = rowObj[5].text
        self.awayFlag = rowObj[6].text
        self.Opp = rowObj[7].text           
        self.Result = rowObj[8].text         
        self.GS    = rowObj[9].text       
        self.Tgt   = rowObj[10].text        
        self.Rec   = int(rowObj[11].text)
        self.RecYds           = int(rowObj[12].text)
        self.YardsPerRec           = float(rowObj[13].text)
        self.RecTD           = int(rowObj[14].text)
        self.CatchPer           = float(rowObj[15].text)
        self.YardsPerTarget           = float(rowObj[16].text)
        self.Att           = int(rowObj[17].text)
        self.RushYds           = int(rowObj[18].text)
        self.RushYardsPerAttemp           = float(rowObj[19].text)
        self.RushTD = int(rowObj[20].text)
        self.Rt = int(rowObj[21].text)
        self.ReturnYds = int(rowObj[22].text)
        self.ReturnYardsPer = float(rowObj[23].text)
        self.ReturnTD = int(rowObj[24].text)
        self.TotalTD = int(rowObj[25].text)
        self.TotalPts = int(rowObj[26].text)


    
