import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Profile() {
  const [username, setUsername] = useState('JohnDoe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [bio, setBio] = useState('Hello, I am John Doe.');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    website: '',
    twitter: '',
    linkedin: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Perform save operation (e.g., update user profile on server)
    setIsEditing(false);
  };

  const handleChooseImage = () => {
    // Implement image selection logic (e.g., using image picker library)
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChooseImage} style={styles.imageContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.heading}>Profile</Text>
      <View style={styles.field}>
        <Text style={styles.label}>Username:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        ) : (
          <Text style={styles.text}>{username}</Text>
        )}
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Email:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        ) : (
          <Text style={styles.text}>{email}</Text>
        )}
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Bio:</Text>
        {isEditing ? (
          <TextInput
            style={[styles.input, { height: 100 }]}
            multiline
            value={bio}
            onChangeText={setBio}
          />
        ) : (
          <Text style={styles.text}>{bio}</Text>
        )}
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Phone Number:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        ) : (
          <Text style={styles.text}>{phoneNumber}</Text>
        )}
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Website:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={socialLinks.website}
            onChangeText={(text) => setSocialLinks({ ...socialLinks, website: text })}
          />
        ) : (
          <Text style={styles.text}>{socialLinks.website}</Text>
        )}
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Twitter:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={socialLinks.twitter}
            onChangeText={(text) => setSocialLinks({ ...socialLinks, twitter: text })}
          />
        ) : (
          <Text style={styles.text}>{socialLinks.twitter}</Text>
        )}
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>LinkedIn:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={socialLinks.linkedin}
            onChangeText={(text) => setSocialLinks({ ...socialLinks, linkedin: text })}
          />
        ) : (
          <Text style={styles.text}>{socialLinks.linkedin}</Text>
        )}
      </View>
      {isEditing ? (
        <Button title="Save" onPress={handleSave} />
      ) : (
        <Button title="Edit" onPress={handleEdit} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  label: {
    width: 100,
    marginRight: 10,
    fontWeight: 'bold',
  },
  text: {
    flex: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
