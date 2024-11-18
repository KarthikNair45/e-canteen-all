import { StyleSheet, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useContext} from 'react';
import { FoodContext } from '@/context/FoodContext';
import { FontAwesome } from '@expo/vector-icons';
type AddorMultipleProps={
    id:number;
  }
  

export default function AddorMultiple({id}:AddorMultipleProps){
    const handlePress=async(id:number)=>{
        await setFoodSelected(oldArray => [...oldArray, id]);
    
        console.log(foodSelected)
      }
      const handleMinusPress = async (id: number) => {
        await setFoodSelected(oldArray => {
          const index = oldArray.indexOf(id); // Find the first occurrence of id
          if (index !== -1) {
            return [...oldArray.slice(0, index), ...oldArray.slice(index + 1)];
          }
          return oldArray; // If id is not found, return the original array
        });
        console.log(`Removed one instance of ${id} from foodSelected`);
      };

      
    const useFoodContext = () => {
        const context = useContext(FoodContext);
      
        if (!context) {
          throw new Error("useFoodContext must be used within a FoodProvider");
        }
      
        return context;
       } // Guaranteed to be of type FoodContextType
      const { foodSelected, setFoodSelected } = useFoodContext();
        if (!foodSelected.includes(id)){
          return (
            <Pressable style={styles.addbutton} onPress={()=>handlePress(id)}>
            <Text>Add</Text>
            </Pressable>
          )
        }
        else{
          return (
          <View style={styles.iconsbutton}>
            <Pressable onPress={()=>handlePress(id)}>
              <FontAwesome size={15} name='plus'/>
            </Pressable>
            <Text style={styles.text}>{foodSelected.filter(x => x==id).length}</Text>
            <Pressable onPress={()=>handleMinusPress(id)}>
              <FontAwesome size={15} name='minus'/>
            </Pressable>
            </View>
          )
        }
    }
const styles = StyleSheet.create({
    searchInput: {
      marginBottom: 20,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      width: '90%',
      height: 40,
    },
    addbutton:{ 
      marginTop: 10,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      alignItems:'center'
    },
    iconsbutton:{
      marginTop: 10,
      borderColor: '#ccc',
      borderWidth:1,
      borderRadius:1,
      alignItems:'center',
      flexDirection:'row',
    },
    text:{
      fontSize:20,
      paddingHorizontal:10
    }
  })