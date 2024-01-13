import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useState, useRef } from 'react';

export default function App() {

  let [pointA, setPointA] = useState(0)
  let [pointB, setPointB] = useState(0)
  let [colorTeamA, setColorTeamA] = useState("lightgreen")
  let [colorTeamB, setColorTeamB] = useState("rgb(255, 105, 97)")
  let [txtConditionA, setTxtConditionA] = useState("Egalité")
  let [txtConditionB, setTxtConditionB] = useState("Egalité")

  const [time, setTime] = useState(0); 
  const [running, setRunning] = useState(false); 
  const intervalRef = useRef(null); 
  const startTimeRef = useRef(0);

  
  //Fonctions pour les boutons + et -
  const addPointA = () => {
    setPointA(pointA => pointA+1)
    setColorTeam()
  };
  const addPointB = () => {
    setPointB(pointB => pointB + 1)
    setColorTeam()
  }
  const minusPointA = () => {
    setPointA(pointA => pointA - 1)
    setColorTeam()
  }
  const minusPointB = () => {
    setPointB(pointB => pointB - 1)
    setColorTeam()
  }

  // Fonction pour le changement de couleur de l'équipe gagnante et perdante 
  const setColorTeam = () => {
    if(pointB>pointA){
      setColorTeamB("lightgreen")
      setColorTeamA("rgb(255, 105, 97)")
      setTxtConditionB("Gagne")
      setTxtConditionA("Perd")
    }
    else if(pointA>pointB){
      setColorTeamA("lightgreen")
      setColorTeamB("rgb(255, 105, 97)")
      setTxtConditionA("Gagne")
      setTxtConditionB("Perd")
    }
    else if(pointA==pointB){
      setColorTeamA("lightgrey")
      setColorTeamB("lightgrey")
      setTxtConditionA("Egalité")
      setTxtConditionB("Egalité")
    }
  }

  //Fonctions pour le chnono
  const startStopwatch = () => { 
    startTimeRef.current = Date.now() - time * 1000; 
    intervalRef.current = setInterval(() => { 
        setTime(Math.floor((Date.now() -  
        startTimeRef.current) / 1000)); 
    }, 1000); 
    setRunning(true); 
  };
  
  const pauseStopwatch = () => { 
    clearInterval(intervalRef.current); 
    setRunning(false); 
  };
  
  const resetStopwatch = () => { 
    clearInterval(intervalRef.current); 
    setTime(0); 
    setRunning(false); 
  }; 


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.titleView}>
        <Text style={styles.title}>Match</Text>
      </View>
      <View style={styles.teams}>
        <View style={[{backgroundColor: colorTeamA,},styles.teamA]}>
          <View style={styles.teamA}>
            <Text style={styles.textTeam}>Team A</Text>
            <Text style={styles.textCondition}>{txtConditionA}</Text>
          </View>
          <View>
            <Text style={styles.textPoint}>{pointA}</Text>
          </View>
        </View>
        <View style={[{backgroundColor: colorTeamB,},styles.teamB]}>
          <View style={styles.teamB}>
            <Text style={styles.textTeam}>Team B</Text>
            <Text style={styles.textCondition}>{txtConditionB}</Text>
          </View>
          <View>
            <Text style={styles.textPoint}>{pointB}</Text>
          </View>
        </View>
      </View>
      <View style={styles.viewBtn}>
        <Pressable style={styles.btnPlus} onPress={addPointA}>
          <Image source={require('./assets/images/logo_plus.png')} style={{width: 20, height: 20,}} />
        </Pressable>
        <Pressable style={styles.btnMoins} onPress={minusPointA}>
          <Image source={require('./assets/images/logo_moins.png')} style={{width: 20, height: 20, }} />
        </Pressable>
        <Pressable style={styles.btnPlus} onPress={addPointB}>
          <Image source={require('./assets/images/logo_plus.png')} style={{width: 20, height: 20, }} />
        </Pressable>
        <Pressable style={styles.btnMoins} onPress={minusPointB}>
          <Image source={require('./assets/images/logo_moins.png')} style={{width: 20, height: 20, }} />
        </Pressable>
      </View>
      <View style={styles.viewChrono }>
        <Text style={styles.Chrono}>{time}</Text>
      </View>
      <View style={styles.viewBtn}>
        <Pressable style={styles.btnStart} onPress={startStopwatch}>
          <Text>Start</Text>
        </Pressable>
        <Pressable style={styles.btnStop} onPress={pauseStopwatch}>
          <Text>Stop</Text>
        </Pressable>
        <Pressable style={styles.btnReset} onPress={resetStopwatch}>
          <Text>Reset</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
  },
  titleView: {
    backgroundColor: "lightgrey",
    flex: 0.2,
    justifyContent: "center", 
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    
  },
  teams: {
    flexDirection: "row",
    flex: 1,
  },
  teamA: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", 
  },
  teamB: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", 
  },
  viewChrono: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center", 
  },
  Chrono: {
    fontSize: 60,
  },
  viewBtn: {
    flex: 0.15,
    flexDirection: "row",
  },
  btnPlus:{
    backgroundColor: "blue",
    flex: 0.25,
    alignItems: "center",
    justifyContent: "center", 
  },
  btnMoins:{
    backgroundColor: "red",
    flex: 0.25,
    alignItems: "center",
    justifyContent: "center", 
  },
  btnStart:{
    backgroundColor: "blue",
    flex: 0.33,
    alignItems: "center",
    justifyContent: "center", 
  },
  btnStop:{
    backgroundColor: "green",
    flex: 0.33,
    alignItems: "center",
    justifyContent: "center", 
  },
  btnReset:{
    backgroundColor: "red",
    flex: 0.33,
    alignItems: "center",
    justifyContent: "center", 
  },
  textTeam: {
    fontSize: 40,
    fontWeight: "bold",
  },
  textCondition: {
    fontSize: 30,
  },
  textPoint: {
    fontSize: 50,
    flex: 0.5,
  }
});
