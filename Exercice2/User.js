const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Définition du schéma 
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
	// Si le mot de passe n'a pas été modifié, passer à l'étape suivante sans le re-hacher
	if (!this.isModified('password')) {
		return next();
	}
	const salt = await bcrypt.genSalt(10); // Génération d'un sel pour le hachage du mot de passe

	this.password = await bcrypt.hash(this.password, salt); // Hachage du mot de passe avec bcrypt
	next(); // Passe au middleware suivant
});

// Méthode pour comparer un mot de passe fourni avec celui stocké en base
userSchema.methods.comparePassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password); // Renvoie true si les mots de passe correspondent, sinon false
};


module.exports = mongoose.model(`User`, userSchema);
