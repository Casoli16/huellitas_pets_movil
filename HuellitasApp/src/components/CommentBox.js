// CommentBox.js
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const width = Dimensions.get("window").width;

const CommentBox = ({ author, date, comment, rating }) => {
    return (
        <View style={styles.commentBox}>
            <Text style={styles.commentAuthor}>De: {author}</Text>
            <View style={styles.starsContainer}>
                {[...Array(5)].map((_, index) => (
                    <Image
                        key={index}
                        style={styles.star}
                        source={index < rating ? require('../../assets/star_filled.png') : require('../../assets/star_empty.png')}
                    />
                ))}
            </View>
            <Text style={styles.commentText}>{comment}</Text>
            <Text style={styles.commentDate}>Publicado el {date}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    commentBox: {
        width: width * 0.75,
        backgroundColor: "#FFF",
        borderRadius: 10,
        padding: 10,
        textAlignVertical: "top",
        borderColor: "#FCA311",
        borderWidth: 2,
        marginBottom: 10,
        marginTop: 20
    },
    commentAuthor: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5
    },
    starsContainer: {
        flexDirection: "row",
        marginBottom: 5
    },
    star: {
        width: 20,
        height: 20,
        marginHorizontal: 2
    },
    commentText: {
        fontSize: 12.5,
        marginBottom: 5
    },
    commentDate: {
        fontSize: 12,
        color: "#000000",
        alignSelf: "flex-end",
        fontWeight: "bold",
        marginTop: 20
    }
});

export default CommentBox;
