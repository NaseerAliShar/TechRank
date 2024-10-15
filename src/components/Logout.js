import {height} from '../styles/sizes';
import {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Modal, Portal, Text, Provider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = ({navigation}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, [visible]);

  const hideModal = () => {
    setVisible(false);
    navigation.goBack();
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Provider>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
        }}>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalText}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={hideModal}>
                <Text style={styles.cancelButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleLogout}>
                <Text style={styles.confirmButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = {
  modalContainer: {
    shadowRadius: 4,
    borderRadius: 15,
    shadowOpacity: 0.25,
    marginHorizontal: 20,
    height: height * 0.2,
    shadowColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonRow: {
    paddingVertical: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  cancelButton: {
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 25,
    backgroundColor: '#f0f0f0',
  },
  confirmButton: {
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 25,
    backgroundColor: '#ff5e57',
  },
  cancelButtonText: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600',
  },
  confirmButtonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
  },
};

export default Logout;
