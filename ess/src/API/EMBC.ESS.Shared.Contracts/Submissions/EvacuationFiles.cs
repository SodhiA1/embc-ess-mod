﻿// -------------------------------------------------------------------------
//  Copyright © 2021 Province of British Columbia
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//  https://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.
// -------------------------------------------------------------------------

using System;
using System.Collections.Generic;

namespace EMBC.ESS.Shared.Contracts.Submissions
{
    public class EvacuationFile
    {
        public string Id { get; set; }
        public string TaskId { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime LastModified { get; set; }
        public EvacuationFileStatus Status { get; set; }
        public bool RestrictedAccess { get; set; }
        public string PrimaryRegistrantId { get; set; }
        public string SecurityPhrase { get; set; }
        public bool SecurityPhraseChanged { get; set; } = false;
        public DateTime EvacuationDate { get; set; }
        public Address EvacuatedFromAddress { get; set; }
        public IEnumerable<NeedsAssessment> NeedsAssessments { get; set; }
        public string SecretPhrase { get; set; }
        public bool IsSecretPhraseMasked { get; set; }
        public string RegistrationLocation { get; set; }
    }

    public enum EvacuationFileStatus
    {
        Pending,
        Active,
        Completed,
        Expired,
        Archived
    }

    public class NeedsAssessment
    {
        public string Id { get; set; }
        public DateTime CompletedOn { get; set; }
        public DateTime LastModified { get; set; }
        public NeedsAssessmentType Type { get; set; }
        public InsuranceOption Insurance { get; set; }
        public bool? CanEvacueeProvideFood { get; set; }
        public bool? CanEvacueeProvideLodging { get; set; }
        public bool? CanEvacueeProvideClothing { get; set; }
        public bool? CanEvacueeProvideTransportation { get; set; }
        public bool? CanEvacueeProvideIncidentals { get; set; }
        public bool HaveSpecialDiet { get; set; }
        public string SpecialDietDetails { get; set; }
        public bool HaveMedication { get; set; }
        public IEnumerable<HouseholdMember> HouseholdMembers { get; set; } = Array.Empty<HouseholdMember>();
        public IEnumerable<Pet> Pets { get; set; } = Array.Empty<Pet>();
        public bool? HasPetsFood { get; set; }
        public IEnumerable<Note> Notes { get; set; } = Array.Empty<Note>();
        public IEnumerable<ReferralServices> RecommendedReferralServices { get; set; } = Array.Empty<ReferralServices>();
    }

    public class HouseholdMember
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Initials { get; set; }
        public string PreferredName { get; set; }
        public string Gender { get; set; }
        public string DateOfBirth { get; set; }
        public bool IsUnder19 { get; set; }
        public bool IsPrimaryRegistrant { get; set; }
    }

    public class Pet
    {
        public string Type { get; set; }
        public string Quantity { get; set; }
    }

    public enum InsuranceOption
    {
        No,
        Yes,
        Unsure,
        Unknown
    }

    public enum NeedsAssessmentType
    {
        Preliminary,
        Assessed
    }

    public class Note
    {
        public string Id { get; set; }
        public NoteType Type { get; set; }
        public string Content { get; set; }
        public DateTime AddedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string CreatingTeamMemberId { get; set; }
        public NoteStatus Status { get; set; }
    }

    public enum NoteType
    {
        General,
        EvacuationImpact,
        EvacuationExternalReferrals,
        PetCarePlans
    }

    public enum NoteStatus
    {
        ReadOnly,
        Editable,
        Hidden
    }

    public enum ReferralServices
    {
        Inquiry,
        Health,
        FirstAid,
        Personal,
        ChildCare,
        PetCare
    }
}
