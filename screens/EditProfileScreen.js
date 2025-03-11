
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useUser } from '../context/userContext';
import EditProfileModal from '../components/EditProfileModal';

const EditProfileScreen = ({ navigation }) => {
  const { user } = useUser();
  const [modalVisible, setModalVisible] = useState(true);

  const handleCloseModal = () => {
    setModalVisible(false);
    // navigation.goBack();
  };

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: 'user', label: 'Change Username', onPress: () => setModalVisible(true) },
        { icon: 'mail', label: 'Update Email', onPress: () => {} },
        { icon: 'lock', label: 'Change Password', onPress: () => {} }
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: 'bell', label: 'Notifications', onPress: () => {} },
        { icon: 'globe', label: 'Language', onPress: () => {} },
        { icon: 'moon', label: 'Dark Mode', onPress: () => {} }
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={styles.settingItem}
                onPress={item.onPress}
              >
                <View style={styles.settingIconContainer}>
                  <Feather name={item.icon} size={20} color="white" />
                </View>
                <Text style={styles.settingLabel}>{item.label}</Text>
                <Feather name="chevron-right" size={20} color="gray" />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      <EditProfileModal
        visible={modalVisible}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8d9196',
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingLabel: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
});

export default EditProfileScreen;