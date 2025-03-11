
import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
  Image,
  Platform
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useUser } from '../context/userContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../Lib/firebase';

const EditProfileModal = ({ visible, onClose }) => {
  const { user, setUser } = useUser();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (visible && user) {
      setUsername(user.username || '');
      setError('');
    }
  }, [visible, user]);

  const handleSave = async () => {
    if (!username.trim()) {
      setError('Username cannot be empty');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // If user is authenticated, update in Firestore
      if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          username: username.trim()
        });
      }

      // Update local context
      setUser({
        ...user,
        username: username.trim()
      });

      setIsLoading(false);
      Alert.alert('Success', 'Profile updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
      setIsLoading(false);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Feather name="x" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.profileImageContainer}>
              <Image
                source={require('../assets/m4.jpg')}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editImageButton}>
                <Feather name="camera" size={20} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter username"
                placeholderTextColor="#666"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.emailDisplay}>{user?.email || 'No email available'}</Text>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.saveButtonText}>Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    width: '90%',
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
  },
  closeButton: {
    padding: 5,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 25,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#8d9196',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#262626',
    color: 'white',
    borderRadius: 8,
    padding: Platform.OS === 'ios' ? 15 : 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  emailDisplay: {
    fontSize: 16,
    color: '#999',
    backgroundColor: '#262626',
    borderRadius: 8,
    padding: Platform.OS === 'ios' ? 15 : 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  errorText: {
    color: '#FF5252',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#8d9196',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default EditProfileModal;